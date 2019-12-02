'use strict'

import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import "../../CSS/navbar.css"
import LeftNav from "../LeftNav";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import axios from 'axios';
import { Redirect } from 'react-router'
import config from '../../Config/settings.js'

import TweetContent from "../TweetContent";

class Follow extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeKey: "Following",
            followers: [],
            following: [],
            username: "",
            firstName: "",
            lastName: "",
            profilePicture: ""
        }
        this.changeActiveTabKey = this.changeActiveTabKey.bind(this);
    }

    componentDidMount = () => {
        console.log("Did mount of Follow component");
        console.log(this.props.location.state);
        let following = [];
        let index = 0;
        let followingArr = this.props.location.state.following;
        for (index = 0; index < followingArr; index++) {
            let username = followingArr[index];
            axios.defaults.withCredentials = true;
            let data = {
                username: username,
            }

            axios({
                method: 'post',
                url: 'http://' + config.hostname + ':3001/getProfileDetails',
                data,
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log('response from DB: ');
                        console.log(response.data);
                        following.push({
                            username: response.data.details.rows.username,
                            firstName: response.data.details.rows.firstName,
                            lastName: response.data.details.rows.lastName,
                            description: response.data.details.rows.description,
                            profilePicture: undefined,
                        })
                    } else {
                        console.log("Status Code: ", response.status);
                        console.log(response.data.responseMessage);
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
        this.setState({
            following: following,
            activeKey: "Following",
        })
    }

    changeActiveTabKey = (e) => {
        console.log(e.target.value);
        console.log(e);
    }

    render() {
        //  console.log(this.state);
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },

            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" },
            { label: 'Logout', link: '/', className: "fa fa-sign-out" },

            // { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>
                    </Col>
                    <Col className="col-sm-6">
                        <Tabs activeKey="Following" mountOnEnter={true}>
                            <Tab eventKey="Followers" title="Followers">
                                <TabContainer onSelect={this.changeActiveTabKey}>

                                </TabContainer>
                            </Tab>
                            <Tab eventKey="Following" title="Following">
                                <TabContainer activeKey="Following" onSelect={this.changeActiveTabKey}>

                                </TabContainer>
                            </Tab>
                        </Tabs>
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

export default Follow;