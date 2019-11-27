import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import FollowersTweets from "./FollowersTweets.js";
import '../CSS/tweetArea.css';
import TweetModal from './TweetModal';
import ReplyModal from './ReplyModal';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink
  } from "reactstrap";

const settings = require("../Config/settings");

export class TweetContent extends Component {
    state = {
        allTweets : []
    }
    constructor(props) {
        super(props);
    }
    /*componentDidMount() {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/getFollowersTweets";
        //TODO :get userId from local storage
        //TODO :or get followers list from local storage and send it
        let data = {userId : 123};
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
                if(responseData.status){
                    this.setState({
                        allTweets : responseData.message
                    });
                } else {
                    swal(responseData.message);
                }
                //swal(responseData.message); 
            }).catch(function (err) {
                console.log(err)
            });
    }*/

    writeATweet = (tweetObj) =>{
        //TODO :get userId from local storage
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

    getUserTweets = () => {
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


    like=(event)=>{

        
    }

    cardbtn=(event)=>{

        alert("hi")
    }
    render(){
        let allTweetsComponent;
        if(this.state.allTweets && this.state.allTweets.length > 0){
            allTweetsComponent = <FollowersTweets allTweets = {this.state.allTweets} />;
        }
        return (
            <div>
               
                <div>
                    <form onSubmit = {this.submitHandler}>
                        <h5 style={{fontWeight:"bolder"}}>Home</h5>
                        <textarea name="tweetText" className = "form-control"></textarea>
                        <button className = "btn btn-success" type="submit">Submit</button>
                    </form>
                    <Button onClick = {this.getUserTweets}>Get Tweets</Button>
                    {allTweetsComponent}

                </div><br/>
                <div className="space">
                    <div>
                        <textarea id="tweetArea" className="form-control" rows="4" style={{borderColor:"white",fontSize:"21px"}} placeholder="What's happening?" autoFocus></textarea>
                        <div style={{display:'inline-block'}}>
                        <i id="image" class="far fa-image fa-2x"></i>
                        <button className="btn btn-primary btn-circle" type="submit" style={{position:'absolute',  right:'60px',fontWeight:"bold"   }}>Tweet</button><br/><br/><br/>
                        </div>
                        
                    </div>
                </div>
                <div class="tweet-container">
                    <div class="tweet-body">
                        <a class="a-card card-block text-decoration-none" href="http://localhost:3000/TweetPage" >
                        <Card >
                            <CardBody>
                                <CardTitle style={{fontWeight:"bolder"}}>Times Now<span style={{color:"grey",fontWeight:"normal"}}> @timesnow</span></CardTitle>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle>
                            
                            {<img width="100%" src="/assets/318x180.svg" alt="Card image cap" />}
                            */}
                                
                                <CardText>oneplus says hit by data breach, usernames, addresses leaked.</CardText>
                                <CardLink href="#"> Link1</CardLink>
                                <CardLink href="#"> Link2</CardLink>
                                <br/><br/>
                                <div><i class="fas fa-heart fa-lg" style={{color:"red"}} onClick={this.like}></i>       <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span></div>
                                <a onClick={this.like}><i class="like far fa-heart fa-lg" style={{color:"grey"}}>20</i></a>     <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
                                <a  data-toggle="modal" data-target="#replyModal"><i class="far fa-comment fa-lg" style={{color:"grey"}}> 55</i></a>      <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>

                                
                                {/** added dropdown */}
                                <i class="fas fa-retweet fa-lg dropdown" data-toggle="dropdown" style={{color:"grey"}}> <span style={{fontWeight:"normal"}}> 10</span></i>  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
                                <ul class="dropdown-menu">
                                    <li><a href="#" class=" dropdown-item "><i class="fas fa-pen" style={{color:"grey"}}></i>&nbsp; &nbsp;&nbsp;Retweet</a></li>
                                    <li><a href="#" class="dropdown-item"  data-toggle="modal" data-target="#tweetModal"><i class="fas fa-retweet" style={{color:"grey"}}></i>&nbsp; &nbsp;Retweet with a comment</a></li>
                                </ul>
                            
                            
                                <i class="far fa-bookmark fa-lg" style={{color:"grey"}}></i>

                            </CardBody>

                        
                        </Card>
                        </a>
                    
                    </div>
                </div>
                <TweetModal/>
                <ReplyModal/>
             </div>
        );
    }
}

export default TweetContent;