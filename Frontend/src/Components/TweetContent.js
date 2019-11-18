import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
const settings = require("../config/settings.js");

export class TweetContent extends Component {
    writeATweet = (tweetObj) =>{
        let data = {userId : 123, tweetText :tweetObj.tweetText};
        //let data = {userId : 123};
        let postURL = "http://"+settings.hostname+":"+settings.port+"/writeATweet";
        axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: postURL,        
            data: data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
            //headers: {"Authorization" : `Bearer ${token}`} 
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                swal(responseData.message);
                
            }).catch(function (err) {
                console.log(err)
            });
    }

    submitHandler = (evt) =>{
        debugger;
        evt.preventDefault();
        let target = evt.target;
        var formData = new FormData(evt.target);
        let tweetObj = { "tweetText": formData.get('tweetText') }
        
        this.writeATweet(tweetObj);
    }
    render(){
        return (
            <form onSubmit = {this.submitHandler}>
                <textarea name="tweetText" className = "form-control"></textarea>
                <button className = "btn btn-success" type="submit">Submit</button>
            </form>
        );
    }
}

export default TweetContent;