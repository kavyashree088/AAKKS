import React, { Component } from "react";
import { Row, Col, Card } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
const settings = require("../Config/settings");

export class FollowersTweets extends Component {
   state = {
       allTweets : []
   };
   constructor(props){
       super(props);
       this.state.allTweets = this.props.allTweets;
   }
   render(){
       let allTweets = this.state.allTweets;
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
class TweetComponent extends Component {
    state = {
        tweetText : '',
        likesNum : 0,
        repliesNum : 0
    };
    constructor(props){
        super(props);
        if(this.props.tweet){
            this.state.tweetText = this.props.tweet.tweetText;
            this.state.likesNum = this.props.tweet.likes ? this.props.tweet.likes.length : 0;
            this.state.repliesNum = this.props.tweet.replies ? this.props.tweet.replies.length : 0;
        }
    }
    render(){
        return(
            <Card>
                <div> profilepic </div>
                <Row><div> {this.state.tweetText} </div> </Row>
                <Row>
                    <Col> {this.state.likesNum} likes</Col> 
                    <Col> {this.state.repliesNum} replies</Col>
                </Row>
            </Card>
        );
    }
}
export default FollowersTweets;