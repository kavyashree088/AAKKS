import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {getListTweets} from '../JS/Actions/tweetAction';
import ReplyModal from './ReplyModal';
import TweetModal from './TweetModal';
import TweetComponent from './TweetComponent.js';
const settings = require("../config/settings.js");
const getUserName="anjali";

export class ListTweets extends Component {
    componentDidMount() {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/showListTweet/showListTweet";
        //TODO :get userId from local storage
        //TODO :or get followers list from local storage and send it
        let listID = this.props.listID;
        let data = {listID};
        let dataObj = {data,  url : postURL};
        axios.defaults.withCredentials = true;
        this.props.getListTweets(dataObj);
    }

   render(){
       //debugger;
       let allTweets = this.props.listTweets;
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
        listTweets : state.tweetReducer.listTweets
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        getListTweets : (dataObj) => dispatch(getListTweets(dataObj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListTweets);