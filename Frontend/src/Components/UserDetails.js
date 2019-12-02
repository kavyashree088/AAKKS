/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable lines-between-class-members */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unused-state */
/* eslint-disable indent */
/* eslint-disable spaced-comment */
import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl, Accordion, Card, Image, Dropdown, Button } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import config from './../config/settings'
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import coverImage from "../Components/UserProfile/CoverPhoto.jpg"
//eslint-disable-next-line
class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userProfile: {}
        }
    }

    componentWillMount() {
        if (localStorage.getItem('username')) {
            console.log(this.props.location.state.user)
            this.setState({ user: this.props.location.state.user })
            let data = {
                username: localStorage.getItem("username")
            }
            axios({
                method: 'post',
                url: 'http://' + config.hostname + ':3001/getProfileDetails',
                data,
                config: { headers: { 'Content-Type': 'application/json' } },
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            }).then(async response => {
                await this.setState({ userProfile: response.data.details.rows });
            })
        } else {
            this.props.history.push("/");
        }
    }

    back = () => {
        this.props.history.push("/Explore")
    }
    follow = () => {
        let data = {
            following: this.state.user.username,
            follower: this.state.userProfile.username
        }
        axios({
            method: 'put',
            url: 'http://' + config.hostname + ':3001/follow',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            console.log(response)
            this.setState({ userProfile: response.data.result });
        })
    }

    unfollow = () => {
        let data = {
            following: this.state.user.username,
            follower: this.state.userProfile.username
        }
        axios({
            method: 'put',
            url: 'http://' + config.hostname + ':3001/unfollow',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            this.setState({ userProfile: response.data.result });
        })
    }

    addDefaultSrc = (event) => {
        console.log("error")
        event.target.onError = null;
        event.target.src = `https://${config.imageurl}/profileAlias.jpeg`
    }
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '/Bookmarks', className: "fas fa-bookmark" },
            { label: 'Lists', link: '/List', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }
        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>

                    </Col>
                    <Col className="col-sm-6 pt-3">
                        <div>
                            <Row>
                                <Col className="col-sm-1" style={{
                                    textAlign: "center"
                                }}>
                                    <span className="fas fa-arrow-left active" onClick={this.back}></span>
                                </Col>
                                <Col className="col-sm-11">
                                    <h3>{this.state.user.firstName}</h3>
                                </Col>
                            </Row>


                            <hr />
                        </div>
                        <div>
                            <img className="coverImageStyle" src={coverImage} alt="twitterCoverPage" />
                            <Row>
                                <Col xs={6} md={4}>
                                    <Row>
                                        <img className="img-thumbnail" src={`https://${config.imageurl}/${this.state.user.profilePicture}`} onError={this.addDefaultSrc} />
                                    </Row>
                                </Col>
                                <Col xs={8} >
                                    {this.state.userProfile.following !== undefined && this.state.userProfile.following.includes(this.state.user.username) ? (
                                        <Button variant="primary" className="followButton" label="Edit Profile" onClick={this.unfollow}></Button>
                                    ) : (
                                            <Button className="editButton" label="Edit Profile" onClick={this.follow}>Follow</Button>
                                        )}

                                </Col>
                            </Row>
                            <div>
                                <h3>{this.state.user.firstName}</h3>
                                <p className="lightFont" style={{
                                    margin: "0px"
                                }}>@{this.state.user.username}</p>
                                <p style={{
                                    margin: "0px"
                                }}><b>Bio: </b><i>{this.state.user.description}</i></p>

                                <p style={{
                                    margin: "2px"
                                }}><b>Location: </b>{this.state.user.city}</p>
                                <Row>
                                    <Col><p style={{
                                        marginRight: "5px",
                                        marginLeft: "5px"
                                    }}><b>{this.state.user.followers.length || 0}</b><b className="lightFont"> Followers</b></p></Col>

                                    <Col>
                                        <p><b>{this.state.user.following.length || 0}</b><b className="lightFont"> Following</b></p>
                                    </Col>

                                </Row>
                            </div>
                            <div>
                                <Tabs defaultActiveKey="profile" id="profileTweets">

                                    <Tab className="profileTab" eventKey="tweets" title="Tweets">

                                    </Tab>
                                    <Tab eventKey="replies" title="Retweets" className="profileTab">

                                    </Tab>
                                    <Tab eventKey="likes" title="Likes" className="profileTab">

                                    </Tab>
                                </Tabs>
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

export default UserDetails;