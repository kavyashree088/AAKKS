import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import TweetContent from "./TweetContent";
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

class TweetPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearch = (event) => {
        if (event.key === "Enter") {
            console.log(this.state.searchText)
        }
    }

    render() {
        let links = [
            { label: 'Home', link: '/', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag", active: true },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '#home', className: "fas fa-user-circle" },
            { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];
        return (
            <div>
                <TweetModal/>
                <ReplyModal/>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>

                    </Col>
                    <Col className="col-sm-6 pt-3">
                        <div>
                        <div class="tweet-container">
                    <div class="tweet-body">
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
                    
                    </div>
                </div>
                        </div>
                    </Col>
                    <Col className="col-sm-3">
                        <div className="navbar-side-right" id="navbarSide">
                            here
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default TweetPage;
    