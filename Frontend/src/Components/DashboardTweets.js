import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {getDashboardTweets, likeATweet, unlikeATweet, bookmarkATweet, unbookmarkATweet} from '../JS/Actions/tweetAction.js';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink
  } from "reactstrap";
const settings = require("../config/settings.js");

export class DashboardTweets extends Component {
    componentDidMount() {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/getDashboardTweets";
        //TODO :get userId from local storage
        //TODO :or get followers list from local storage and send it
        let data = {userId : 123, url : postURL};
        axios.defaults.withCredentials = true;
        this.props.getDashboardTweets(data);
    }

   render(){
       let allTweets = this.props.dashboardTweets;
       let tweetsMarkup = [];
       if(allTweets && allTweets.length > 0){
           for(let i= 0; i< allTweets.length; i++){
            tweetsMarkup.push(<TweetComponent key={i} tweet = { allTweets[i] }/>);
           }
           return tweetsMarkup;
       } else {
           return <div></div>;
       }
   }
}
class TweetComponentInner extends Component {
    state = {
        tweetText : '',
        likesNum : 0,
        repliesNum : 0,
        userName : '',
        likeClass : 'like far fa-heart fa-lg grey',
        bookmarkClass : 'fas fa-bookmark grey',
        currUserId : ''
    };
    constructor(props){
        super(props);
        let currUserId = '123';
        if(this.props.tweet){
            this.state.userName = this.props.userName;
            this.state.tweetText = this.props.tweet.tweetText;
            this.state.likesNum = this.props.tweet.likes ? this.props.tweet.likes.length : "";
            this.state.repliesNum = this.props.tweet.replies ? this.props.tweet.replies.length : "";
            if(this.props.tweet.likes.includes(currUserId)){
                this.state.likeClass = 'like fas fa-heart fa-lg red';
            }
            if(this.props.tweet.bookmarks.includes(currUserId)){
                this.state.bookmarkClass = 'fas fa-bookmark orange';
            }
        }
    }
    processTweetText(tweetText){
       debugger;
       let hyperLinkExp = /http:\/\/[\w\.\/]*/g;
       let textArr = tweetText.split(' ');
       for(let i=0; i<textArr.length; i++){
           let text = textArr[i];
           let match = hyperLinkExp.exec(text);
           if(match){
               let http = /http:\/\//g;
               text = text.replace(http,"") + " ";
               textArr[i] = <CardLink href={textArr[i]} target = "_blank">{text}</CardLink>
           } else {
               textArr[i] = textArr[i] + " ";
           }
       }
       return <CardText> {textArr} </CardText>;
    }

    likeATweet(currClass){
        
        axios.defaults.withCredentials = true;
        if(currClass.indexOf('red') != -1){
            let postURL = "http://"+settings.hostname+":"+settings.port+"/unlikeATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let data = {userId : "123"};
            let dataObj = { data, url : postURL};
            this.setState({
                likeClass : 'like far fa-heart fa-lg grey'
            });
            this.props.unlikeATweet(dataObj);
        } else {
            let postURL = "http://"+settings.hostname+":"+settings.port+"/likeATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let dataObj = {userId : 123, url : postURL};
            this.setState({
                likeClass : 'like fas fa-heart fa-lg red'
            });
            this.props.likeATweet(dataObj);
        }
    }

    bookmarkATweet(currClass){
        
        axios.defaults.withCredentials = true;
        if(currClass.indexOf('orange') != -1){
            this.setState({
                bookmarkClass : 'fas fa-bookmark grey'
            });
            let postURL = "http://"+settings.hostname+":"+settings.port+"/unbookmarkATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let dataObj = {userId : 123, url : postURL};
                this.props.unbookmarkATweet(dataObj);
        } else {
            let postURL = "http://"+settings.hostname+":"+settings.port+"/bookmarkATweet";
            //TODO :get userId from local storage
            //TODO :or get followers list from local storage and send it
            let dataObj = {userId : 123, url : postURL};
            this.setState({
                bookmarkClass : 'fas fa-bookmark orange'
            });
            this.props.bookmarkATweet(dataObj);
        }
    }

    render(){
       let {userName, userId, tweetText, replies, likes, retweetNum} = this.props.tweet;
       let repliesNum = replies ? replies.length : "";
       let likesNum = likes ? likes.length : "";
       //TODO get from local storage
       let {likeClass, bookmarkClass } = this.state;
        return(
            <div class="tweet-container">
            <div class="tweet-body">
            <Card >
            <CardBody>
                <CardTitle style={{fontWeight:"bolder"}}>{userName}<span style={{color:"grey",fontWeight:"normal"}}> {userId}</span></CardTitle>
                {this.processTweetText(tweetText)}
                <br/><br/>
                
                <a onClick={() => this.likeATweet(likeClass)}> <i className={likeClass} ></i></a><span> {likesNum}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>

                <i className="far fa-comment fa-lg" style={{color:"grey"}}> {repliesNum}</i><span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
                <i className="fas fa-retweet fa-lg" style={{color:"grey"}}> <span style={{fontWeight:"normal    "}}> {retweetNum}</span></i><span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
                <a onClick={() => this.bookmarkATweet(bookmarkClass)}><i className={bookmarkClass}></i></a>
            </CardBody>

            </Card>

            </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("in map state to props..");
    console.log(state);
    return{
        dashboardTweets : state.tweetReducer.dashboardTweets
    }
}
//export default SignupBuyer;
const mapDispatchToProps = function(dispatch){
    return {
        getDashboardTweets : (dataObj) => dispatch(getDashboardTweets(dataObj)),
        likeATweet : (dataObj) => dispatch(likeATweet(dataObj)),
        unlikeATweet : (dataObj) => dispatch(unlikeATweet(dataObj)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTweets);
let TweetComponent = connect(mapStateToProps, mapDispatchToProps)(TweetComponentInner);