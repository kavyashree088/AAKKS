import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {getDashboardTweets} from '../JS/Actions/tweetAction.js';
import ReplyModal from './ReplyModal';
import TweetModal from './TweetModal';
import TweetComponent from './TweetComponent.js';
const settings = require("../config/settings.js");
const {getUserName} = require('./tweetApis.js');

export class DashboardTweets extends Component {
    componentDidMount() {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/getDashboardTweets";
        //TODO :get userId from local storage
        //TODO :or get followers list from local storage and send it
        let username = getUserName();
        let data = {username};
        let dataObj = {data,  url : postURL};
        axios.defaults.withCredentials = true;
        this.props.getDashboardTweets(dataObj);
    }

   render(){
       debugger;
       let allTweets = this.props.dashboardTweets;
       let tweetsMarkup = [];
       if(allTweets && allTweets.length > 0){
           let i=0;
           for( i= 0; i< allTweets.length; i++){
            tweetsMarkup.push(<TweetComponent key={i} tweet = { allTweets[i] }/>);
           }
           tweetsMarkup.push(<ReplyModal key={i+1}/>)
           tweetsMarkup.push(<TweetModal key={i+2}/>)
           return tweetsMarkup;
       } else {
           return <div></div>;
       }
   }
}

const mapStateToProps = (state, ownProps) => {
    return{
        dashboardTweets : state.tweetReducer.dashboardTweets
    }
}
//export default SignupBuyer;
const mapDispatchToProps = function(dispatch){
    return {
        getDashboardTweets : (dataObj) => dispatch(getDashboardTweets(dataObj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTweets);