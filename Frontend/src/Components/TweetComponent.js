import React, { Component } from "react";
import { Row, Col, Image } from 'react-bootstrap';
import axios from "axios";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeATweet, unlikeATweet, bookmarkATweet, unbookmarkATweet, setCurrentTweet, retweetWithoutComment, retweetWithComment } from '../JS/Actions/tweetAction.js';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink,

} from "reactstrap";
import ReplyModal from './ReplyModal';
import TweetModal from './TweetModal';
import { TweetBody } from "./TweetBody.js";
import $ from 'jquery';

const settings = require("../Config/settings.js");
const { processTweetText, getUserName, getMonthAndDate, getUserFullName } = require('./tweetApis.js');


class TweetComponentInner extends Component {
    state = {
        tweetText: '',
        likesNum: 0,
        repliesNum: 0,
        username: '',
        likeClass: 'like far fa-heart fa-lg grey',
        bookmarkClass: 'fas fa-bookmark grey',
        retweetClass: 'fas fa-retweet fa-lg dropdown grey'
    };
    constructor(props) {
        super(props);
        let currUserName = getUserName();
        if (this.props.tweet) {
            this.state.username = this.props.username;
            this.state.tweetText = this.props.tweet.tweetText;
            this.state.likesNum = this.props.tweet.likes.length > 0 ? this.props.tweet.likes.length : "";
            this.state.repliesNum = this.props.tweet.replies.length > 0 ? this.props.tweet.replies.length : "";
            this.state.retweetNum = this.props.tweet.retweets.length > 0 ? this.props.tweet.retweets.length : "";
            this.state.likesNum = '';
            let likes = this.props.tweet.likes;
            if (likes.length > 0) {
                this.state.likesNum = likes.length;
                // let currUserLiked = false;
                for (let i = 0; i < likes.length; i++) {
                    let like = likes[i];
                    if (like.username === currUserName) {
                        //currUserLiked = true;
                        this.state.likeClass = 'like fas fa-heart fa-lg red';
                        break;
                    }
                }
            }

            if (this.props.tweet.bookmarks.includes(currUserName)) {
                this.state.bookmarkClass = 'fas fa-bookmark orange';
            }
            if (this.state.retweetNum > 0) {
                this.state.retweetClass = 'fas fa-retweet fa-lg dropdown green';
            }
        }
    }


    likeOrUnlikeATweet(currClass, tweetId) {
        let username = getUserName();
        let userFullName = getUserFullName();
        let data = { username, userFullName, tweetId };
        axios.defaults.withCredentials = true;
        if (currClass.indexOf('red') != -1) {
            let postURL = "http://" + settings.hostname + ":" + settings.port + "/unlikeATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let dataObj = { data, url: postURL };
            let { likesNum } = this.state;
            likesNum--;
            this.setState({
                likeClass: 'like far fa-heart fa-lg grey',
                likesNum: likesNum
            });
            this.props.unlikeATweet(dataObj);
        } else {
            let postURL = "http://" + settings.hostname + ":" + settings.port + "/likeATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let dataObj = { data, url: postURL };
            let { likesNum } = this.state;
            likesNum++;
            this.setState({
                likeClass: 'like fas fa-heart fa-lg red',
                likesNum: likesNum
            });
            this.props.likeATweet(dataObj);
        }
    }

    bookmarkOrUnbookmarkATweet(currClass, tweetId) {
        axios.defaults.withCredentials = true;
        let username = getUserName();
        let data = { username, tweetId };
        if (currClass.indexOf('orange') != -1) {
            this.setState({
                bookmarkClass: 'fas fa-bookmark grey'
            });
            let postURL = "http://" + settings.hostname + ":" + settings.port + "/unbookmarkATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let dataObj = { data, url: postURL };
            this.props.unbookmarkATweet(dataObj);
        } else {
            let postURL = "http://" + settings.hostname + ":" + settings.port + "/bookmarkATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let dataObj = { data, url: postURL };
            this.setState({
                bookmarkClass: 'fas fa-bookmark orange'
            });
            this.props.bookmarkATweet(dataObj);
        }
    }

    retweetWithoutComment(tweetId, userId) {
        axios.defaults.withCredentials = true;
        let username = getUserName();
        let userFullName = getUserFullName();
        let data = { username, userFullName, tweetId };
        let postURL = "http://" + settings.hostname + ":" + settings.port + "/retweetWithoutComment";
        let dataObj = { data, url: postURL };
        this.props.retweetWithoutComment(dataObj);
        let { retweetNum } = this.state;
        retweetNum++;
        this.setState({
            retweetNum,
            retweetClass: 'fas fa-retweet fa-lg dropdown green'
        });
    }

    renderInnerTweet(isRetweet, actualTweetDetails) {
        if (isRetweet === 'true' && actualTweetDetails) {
            return <TweetBody tweet={actualTweetDetails} />
        } else {
            return <div></div>
        }
    }

    displayImages(media) {
        if (media) {
            let imgArr = [];
            for (let i = 0; i < media.length; i++) {
                let imgUrl = settings.s3bucket + media[i];
                imgArr.push(<img key={i} src={imgUrl} className='tweetImage' />);
            }
            return imgArr;
        } else {
            return <div></div>
        }
    }

    tweetClickHandler(url) {
        console.log("url is..");
        console.log(url);
        $(window)[0].location.href = url;
    }

    clickUser = (link) => (event) => {
        this.props.history.push({
            pathname: "/userDetailsPage/" + link,
            state: { user: link }
        });
    }

    render() {
        //debugger;
        let { userFullName, username, userId, tweetText, media, replies, likes, isRetweet, actualTweetDetails, profilePic, createdAt } = this.props.tweet;
        //let userFullName = firstName + " " + lastName;
        let tweetId = this.props.tweet._id;
        let { likesNum, repliesNum, retweetNum } = this.state;
        //TODO get from local storage
        let { likeClass, bookmarkClass, retweetClass } = this.state;
        let userLinkUrl = username;
        //let tweetUrl = 'http://' + settings.frontendHostName +':' +settings.port +'/tweet/'+tweetId;
        let tweetUrl = '/tweet/' + tweetId;
        let profileImg = settings.s3bucket + profilePic;
        let postedDateStr = getMonthAndDate(createdAt);
        // <Link to ={tweetUrl}>
        // <img src = {profileImg} style={{width:'100%'}}/>
        return (
            <div className="tweet-container" onClick={() => { this.tweetClickHandler(tweetUrl) }}>
                <div className="tweet-body">

                    <Card >
                        <CardBody>
                            <Row>
                                <Col xs={4}>
                                    <Image src={profileImg}
                                        style={{
                                            height: "100px",
                                            width: "100px",
                                            margin: "8px"
                                        }}
                                        roundedCircle
                                        alt=""
                                    ></Image>

                                </Col>
                                <Col xs={8}>
                                    <Row>
                                        <a className="active" onClick={this.clickUser(userLinkUrl)}>
                                            <CardTitle className='blue bolder' >{userFullName}<span className='grey normal'> @{username}</span> &nbsp; &nbsp; <span className='grey normal'>{postedDateStr}</span></CardTitle>
                                        </a>
                                    </Row>

                                    {processTweetText(tweetText)}
                                    {this.displayImages(media)}
                                    {this.renderInnerTweet(isRetweet, actualTweetDetails)}
                                    <br /><br />
                                    <a onClick={(evt) => { evt.stopPropagation(); this.likeOrUnlikeATweet(likeClass, tweetId) }}> <i className={likeClass} ></i></a><span> {likesNum}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
                                    <a data-toggle='modal' data-target='#replyModal' onClick={(evt) => { evt.stopPropagation(); this.props.setCurrentTweet(this.props.tweet) }}><i className='far fa-comment fa-lg grey'> {repliesNum}</i></a> <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>

                                    {/** added dropdown */}
                                    <i className={retweetClass} data-toggle="dropdown"> <span style={{ fontWeight: "normal" }}> {retweetNum}</span></i>  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
                                    <ul className="dropdown-menu">
                                        <li><a href="#" className=" dropdown-item grey" onClick={(evt) => { evt.stopPropagation(); this.retweetWithoutComment(tweetId, userId) }}><i className="fas fa-pen" ></i>&nbsp; &nbsp;&nbsp;Retweet</a></li>
                                        <li><a href="#" className="dropdown-item grey" onClick={(evt) => { evt.stopPropagation(); this.props.setCurrentTweet(this.props.tweet) }} data-toggle="modal" data-target="#tweetModal"><i className="fas fa-retweet"></i>&nbsp; &nbsp;Retweet with a comment</a></li>
                                    </ul>
                                    <a onClick={(evt) => { evt.stopPropagation(); this.bookmarkOrUnbookmarkATweet(bookmarkClass, tweetId) }}><i className={bookmarkClass}></i></a>
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dashboardTweets: state.tweetReducer.dashboardTweets
    }
}
//export default SignupBuyer;
const mapDispatchToProps = function (dispatch) {
    return {
        likeATweet: (dataObj) => dispatch(likeATweet(dataObj)),
        unlikeATweet: (dataObj) => dispatch(unlikeATweet(dataObj)),
        bookmarkATweet: (dataObj) => dispatch(bookmarkATweet(dataObj)),
        unbookmarkATweet: (dataObj) => dispatch(unbookmarkATweet(dataObj)),
        setCurrentTweet: (currentTweet) => dispatch(setCurrentTweet(currentTweet)),
        retweetWithoutComment: (dataObj) => dispatch(retweetWithoutComment(dataObj)),
        retweetWithComment: (dataObj) => dispatch(retweetWithComment(dataObj)),
    }
}

let TweetComponent = connect(mapStateToProps, mapDispatchToProps)(TweetComponentInner);
export default TweetComponent;