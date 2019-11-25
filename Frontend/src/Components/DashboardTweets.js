import React, { Component } from "react";
import { Row, Col, Card } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {getDashboardTweets} from '../JS/Actions/tweetAction.js';

const settings = require("../config/settings.js");

export class DashboardTweets extends Component {
    componentDidMount() {
        /*let postURL = "http://"+settings.hostname+":"+settings.port+"/getDashboardTweets";
        //TODO :get userId from local storage
        //TODO :or get followers list from local storage and send it
        let data = {userId : 123, url : postURL};
        axios.defaults.withCredentials = true;
        this.props.getDashboardTweets(data);*/
    }

   render(){
       debugger;
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
//export default DashboardTweets;


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
        //signupOwner : (formData) => dispatch(signupBuyer(formData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTweets);