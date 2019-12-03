import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import IndividualTweet from "./IndividualTweet";

class TweetDisplay extends Component {
    state = {
        tweetId : ''
    }
    constructor(props){
        super(props);
        console.log(props);
        this.state.tweetId = this.props && this.props.match.params.tweetId ? this.props.match.params.tweetId : '';
    }
    render() {
        let links = [
            { label: 'Home', link: '/', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '#home', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '/Bookmarks', className: "fas fa-bookmark" },
            { label: 'Lists', link: '/List/'+localStorage.getItem('username'), className: "fas fa-list-alt" },
            { label: 'Profile', link: '#home', className: "fas fa-user-circle" },
            { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} history={this.props.history}></LeftNav>

                    </Col>
                    <Col className="col-sm-6 tweetComponent">
                    <h5 style={{fontWeight:"bolder"}} className = "tweetHeading ">Tweet</h5>
                        <IndividualTweet tweetId = {this.state.tweetId}/>
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

export default TweetDisplay;