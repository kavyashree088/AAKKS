'use strict'

import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import "../../CSS/navbar.css"
import LeftNav from "../LeftNav";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContent from 'react-bootstrap/TabContent'
import axios from 'axios';
import config from '../../Config/settings.js'
import Card from 'react-bootstrap/Card'

class Follow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeKey: "Followers",
            followerDetails: [],
            followingDetails: [],
            currentUserName: "",
        }
        this.changeActiveTabKey = this.changeActiveTabKey.bind(this);
    }

    componentWillMount = () => {
        console.log("Did mount of Follow component");
        console.log(this.props);
        let showFollowers = this.props.location.state.showFollowers;
        let followersArr = this.props.location.state.followers;
        let followingArr = this.props.location.state.following;
        let currentUserName = this.props.location.state.currentUsername;
        this.setState({
            currentUserName: currentUserName,
        })
        // array containing JSON details of each follower
        let followerDetails = [];
        // array containing JSON details of each following
        let followingDetails = [];
        axios({
            method: 'get',
            url: 'http://' + config.hostname + ':3001/getFollow',
            params:followersArr
        }).then(response=>{
            console.log(response)
        })
        if (showFollowers) {
            let index = 0;
            for (index = 0; index < followersArr.length; index++) {
                let username = followersArr[index];
                axios.defaults.withCredentials = true;
                let data = {
                    username: username,
                }
                console.log("Getting details of " + username);
                axios({
                    method: 'post',
                    url: 'http://' + config.hostname + ':3001/getProfileDetails',
                    data,
                })
                    .then(response => {
                        if (response.status === 200) {
                            console.log('response from DB: ');
                            console.log(response.data);
                            followerDetails.push({
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
                        this.setState({
                            followerDetails: followerDetails,
                            activeKey: 'Followers',
                        })
                    }).catch(error => {
                        console.log(error);
                    });
            }
        } else {
            let index = 0;
            for (index = 0; index < followingArr.length; index++) {
                let username = followingArr[index];
                axios.defaults.withCredentials = true;
                let data = {
                    username: username,
                }
                console.log("Following: Getting details of " + username);
                axios({
                    method: 'post',
                    url: 'http://' + config.hostname + ':3001/getProfileDetails',
                    data,
                })
                    .then(response => {
                        if (response.status === 200) {
                            console.log('response from DB: ');
                            console.log(response.data);
                            followingDetails.push({
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
                        this.setState({
                            followingDetails: followingDetails,
                            activeKey: "Following",
                        })
                    }).catch(error => {
                        console.log(error);
                    });
            }
        }
    }

    changeActiveTabKey = (e) => {
        console.log(e);
        axios.defaults.withCredentials = true;
        let data = {
            username: this.state.currentUserName,
        }
        let followersArr = [];
        let followingArr = [];
        console.log("Getting details of " + this.state.currentUserName);
        axios({
            method: 'post',
            url: 'http://' + config.hostname + ':3001/getProfileDetails',
            data,
        }).then(response => {
            if (response.status === 200) {
                console.log('response from DB: ');
                console.log(response.data);
                followersArr.push(response.data.details.rows.followers);
                followingArr.push(response.data.details.rows.following);
                // if e == "Followers", get all data of Followers
                // array containing JSON details of each follower
                let followerDetails = [];
                // array containing JSON details of each following
                let followingDetails = [];
                if (e === "Followers") {
                    let index = 0;
                    for (index = 0; index < followersArr.length; index++) {
                        let username = followersArr[index];
                        axios.defaults.withCredentials = true;
                        let data = {
                            username: username,
                        }
                        console.log("Getting details of " + username);
                        axios({
                            method: 'post',
                            url: 'http://' + config.hostname + ':3001/getProfileDetails',
                            data,
                        })
                            .then(response => {
                                if (response.status === 200) {
                                    console.log('response from DB: ');
                                    console.log(response.data);
                                    followerDetails.push({
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
                                this.setState({
                                    followerDetails: followerDetails,
                                    activeKey: "Followers",
                                })
                            }).catch(error => {
                                console.log(error);
                            });
                    }
                } else {
                    let index = 0;
                    for (index = 0; index < followingArr.length; index++) {
                        let username = followingArr[index];
                        axios.defaults.withCredentials = true;
                        let data = {
                            username: username,
                        }
                        console.log("Following: Getting details of " + username);
                        axios({
                            method: 'post',
                            url: 'http://' + config.hostname + ':3001/getProfileDetails',
                            data,
                        })
                            .then(response => {
                                if (response.status === 200) {
                                    console.log('response from DB: ');
                                    console.log(response.data);
                                    followingDetails.push({
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
                                this.setState({
                                    followingDetails: followingDetails,
                                    activeKey: "Following",
                                })
                            }).catch(error => {
                                console.log(error);
                            });
                    }
                }
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }
        }).catch(error => {
            console.log(error);
        });


    }

    render() {
        console.log(this.state);
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
        let followerCardsDOM = [];
        let followingCardsDOM = [];
        let index = 0;
        for (index = 0; index < this.state.followerDetails.length; index++) {
            let aFollower = this.state.followerDetails[index];
            let firstName = aFollower.firstName;
            let lastName = aFollower.lastName;
            let description = aFollower.description;
            let aFollowerUserName = aFollower.username;
            let Name = firstName + lastName;
            let userLink = '/profile/'+aFollowerUserName
            followerCardsDOM.push(
                <div>
                    <Card bg="light" style={{
                        borderStyle: "none",
                        marginTop: '5px',
                        marginBottom: '5px',
                        heigth: "flex",
                    }}>
                        <Card.Body>
                            <Card.Title>{Name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><a href = {userLink} >@{aFollowerUserName}</a></Card.Subtitle>
                            <Card.Text style={{
                                textAlign: "end",
                                fontWeight: "900",
                            }}>
                                {description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>);
        }
        index = 0;
        for (index = 0; index < this.state.followingDetails.length; index++) {
            let aFollowing = this.state.followingDetails[index];
            let firstName = aFollowing.firstName;
            let lastName = aFollowing.lastName;
            let description = aFollowing.description;
            let aFollowingUserName = aFollowing.username;
            let Name = firstName + lastName;
            let userLink = '/profile/'+aFollowingUserName
            followingCardsDOM.push(
                <div>
                    <Card bg="light" style={{
                        borderStyle: "none",
                        marginTop: '5px',
                        marginBottom: '5px',
                        heigth: "flex",
                    }}>
                        <Card.Body>
                            <Card.Title>{Name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><a href = {userLink} >@{aFollowingUserName}</a></Card.Subtitle>
                            <Card.Text style={{
                                textAlign: "end",
                                fontWeight: "900",
                            }}>
                               <p> {description}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>);
        }

        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>
                    </Col>
                    <Col className="col-sm-6">
                        <Tabs id="controlled-tab-example" activeKey={this.state.activeKey} onSelect={this.changeActiveTabKey}>
                            <Tab eventKey="Followers" title="Followers">
                                <TabContent>
                                    {followerCardsDOM}
                                </TabContent>
                            </Tab>
                            <Tab eventKey="Following" title="Following">
                                <TabContent>
                                    {followingCardsDOM}
                                </TabContent>
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