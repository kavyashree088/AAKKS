import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import "../CSS/navbar.css"

class Home extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <div class="navbar-side" id="navbarSide">
                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fab fa-twitter" style={{
                                        marginRight: "10px",
                                        fontSize: "2rem",
                                        color: "rgba(29,161,242,1.00)"
                                    }}></span>
                                </a>
                            </li>

                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fas fa-home" style={{ marginRight: "10px" }}></span>
                                    <span><b>Home</b></span>
                                </a>
                            </li>
                            <li class="navbar-side-item active">
                                <a class="side-link">
                                    <span class="fas fa-hashtag" style={{ marginRight: "10px" }}></span>
                                    <span><b> Explore</b></span>
                                </a>
                            </li>
                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fas fa-bell" style={{ marginRight: "10px" }}></span>
                                    <span><b>Notifications</b></span>
                                </a>
                            </li>
                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fas fa-envelope" style={{ marginRight: "10px" }}></span>
                                    <span><b>Messages</b></span>
                                </a>
                            </li>
                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fas fa-envelope" style={{ marginRight: "10px" }}></span>
                                    <span><b>Bookmarks</b></span>
                                </a>
                            </li>
                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fas fa-bookmark" style={{ marginRight: "10px" }}></span>
                                    <span><b>Lists</b></span>
                                </a>
                            </li>
                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fas fa-user-circle" style={{ marginRight: "10px" }}></span>
                                    <span><b>Profile</b></span>
                                </a>
                            </li>
                            <li class="navbar-side-item">
                                <a class="side-link">
                                    <span class="fas fa-ellipsis-h" style={{ marginRight: "10px" }}></span>
                                    <span><b>More</b></span>
                                </a>
                            </li>
                        </div>

                    </Col>
                    <Col className="col-sm-6">
                        <InputGroup className="ip2">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><i class="fas fa-search"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Search Twitter"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col className="col-sm-3">
                        <div class="navbar-side-right" id="navbarSide">
                            here
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;