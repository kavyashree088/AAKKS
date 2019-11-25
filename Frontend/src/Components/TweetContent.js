import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import DashboardTweets from "./DashboardTweets.js";
import '../CSS/tweetArea.css';

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
var faker = require('faker');

export class TweetContent extends Component {
    state = {
        tweetData : {},
        tweetText : "",
        tweetImages : []
    }
    constructor(props) {
        super(props);
    }
    

    /*generateFakeData = () => {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/writeATweet"; 
        for(let i=0; i< 1000; i++){
            let fakeNumber = faker.random.number({'min':1, 'max':10});
            let fakeUserId = faker.random.number({'min':1, 'max':10000});
            let fakeText = faker.random.words(fakeNumber);
            let data = {userId : fakeUserId, tweetText :fakeText};
            if(fakeText){
                //console.log(fakeText);
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
                        console.log(responseData.message);
                        
                    }).catch(function (err) {
                        console.log(err)
                    });
            }
                
        }
    };*/

    writeATweet = (evt) =>{
        //TODO :get userId from local storage
       // let data = {userId : 123, tweetText :tweetObj.tweetText};
       debugger;
        evt.preventDefault();
        let {tweetText, tweetImages} = this.state;
        let form_data = new FormData();
       // let form_data = new FormData(evt.target);
        let userId = '123';
        form_data.set('userId', userId);
        //ADD LATER
        form_data.append('tweetImages', tweetImages);
        form_data.set('tweetText',tweetText);
        let postURL = "http://"+settings.hostname+":"+settings.port+"/writeATweet";
        axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: postURL,        
            data: form_data,
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
                this.setState({
                    tweetText :""
                });
                
            }).catch(function (err) {
                console.log(err)
            });
    }

    submitHandler = (evt) =>{
        evt.preventDefault();
        let target = evt.target;
        var formData = new FormData(evt.target);
        let tweetObj = { "tweetText": formData.get('tweetText') }
        
        this.writeATweet(tweetObj);
    }

    getUserTweets = () => {
        //get user id from local storage

        let data = {userId : 123};
        //let data = {userId : 123};
        let postURL = "http://"+settings.hostname+":"+settings.port+"/getUserTweets";
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

    onFileChange(files) {
        debugger;
        if (files == null || files.length == 0) return;
        let file = files[0];
        let tweetImages = this.state.tweetImages; 
        tweetImages.push(file);
        this.setState({
            tweetImages : tweetImages
        });
       /* let userId = '123';
        let tweetText = 'sample';
        const data = new FormData();
        data.append("tweetimage", file, file.name);
        data.set('userId', userId);
        //ADD LATER
        //data.append('tweetImages', tweetImages);
        data.set('tweetText',tweetText);
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
            });*/

        
    }
    
    tweetTextHandler(target){
        let tweetText = target.value;
        this.setState({
            tweetText
        });
    }

    render(){
        /*
        <div>
                <form onSubmit = {this.writeATweet}>
                    <textarea name="tweetText" onChange={(e) => this.tweetTextHandler(e.target)} className = "form-control"></textarea>
                    <input id="profile-image-upload" className="hidden" type="file" onChange={(e) => this.onFileChange(e.target.files)} />
                    <button className = "btn btn-success" type="submit">Submit</button>
                </form>
                <Button onClick = {this.getUserTweets}>Get Tweets</Button>
                <Button onClick = {this.generateFakeData}>generateFakeData</Button>
                <DashboardTweets />
            </div>
        */
        return (
            <div>
            
            <div className="space">
            <div>
              <form onSubmit = {this.writeATweet}>
                <textarea id="tweetArea" className="form-control" rows="4" style={{borderColor:"white",fontSize:"21px"}} placeholder="What's happening?" autoFocus></textarea>
                <div style={{display:'inline-block'}}>
                <div class="image-upload">
                    <label for="input-file">
                    <i id="image" className="far fa-image fa-2x"></i>
                    </label>
                    <input id="input-file" className="hidden" type="file" onChange={(e) => this.onFileChange(e.target.files)} />
                </div>
               
                <button className="btn btn-primary btn-circle" type="submit" style={{position:'absolute',  right:'60px',fontWeight:"bold"   }}>Tweet</button><br/><br/><br/>
                </div>
              </form>  
              <DashboardTweets />
            </div>
            </div>
        </div>
        );
    }
}

export default TweetContent;