import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import IndividualTweet from "./IndividualTweet";

class Home extends Component {
    render() {
        let links = [
            { label: 'Home', link: '/', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '#home', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '#home', className: "fas fa-user-circle" },
            { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>

                    </Col>
                    <Col className="col-sm-6">
                    <h5 style={{fontWeight:"bolder"}}>Tweet</h5>
                        <IndividualTweet/>
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

export default Home;