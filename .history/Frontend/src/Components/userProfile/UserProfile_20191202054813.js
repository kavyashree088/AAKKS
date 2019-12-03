import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './../../CSS/navbar.css'
import LeftNav from '../LeftNav';
import coverImage from './CoverPhoto.jpg'
import './../../CSS/ProfilePage.css'
import './../../CSS/Signup.css'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import EditProfileForm from './EditProfileForm'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


import axios from 'axios';
import { Redirect } from 'react-router'
import config from '../../Config/settings.js'


export class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            city: '',
            state: '',
            zipcode: '',
            userPassword: '',
            description: '',
            followers: [],
            following: [],
            profilePicture: undefined,
            isUser: true,
            updateDone: false,
            showEditButtonModal: false,
            thisButton: "Edit Profile",
            likes: [],
            tweets: "",
            redirectToFollowers: false,
            redirectToFollowing: false,
        }
        // this.updateProfile = this.updateProfile.bind(this);
        this.closeEditProfileModal = this.closeEditProfileModal.bind(this)
        this.saveEditProfileModal = this.saveEditProfileModal.bind(this)
        this.openEditProfileForm = this.openEditProfileForm.bind(this)
        this.getLikes = this.getLikes.bind(this)
        this.getTweets = this.getTweets.bind(this)
        this.followersClickHandler = this.followersClickHandler.bind(this)
        this.followingClickHandler = this.followingClickHandler.bind(this)
    }


    componentDidMount = () => {

        let username = localStorage.getItem('username');
        let currentUsername = this.props.match.params.username;
        console.log("Getting details of user: ")
        console.log(username);
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token')
        console.log(token)
        let data = {
            username: currentUsername
        }
        
        axios({
            method: 'post',
            url: 'http://' + config.hostname + ':3001/getProfileDetails',
            data,
            // config: { headers: { 'Content-Type': 'application/json' } },
            // headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('response from DB: ');
                    console.log(response.data);
                    this.setState({
                        username: response.data.details.rows.username,
                        firstName: response.data.details.rows.firstName,
                        lastName: response.data.details.rows.lastName,
                        email: response.data.details.rows.email,
                        city: response.data.details.rows.city,
                        state: response.data.details.rows.state,
                        zipcode: response.data.details.rows.zipcode,
                        description: response.data.details.rows.description,
                        followers: response.data.details.rows.followers,
                        following: response.data.details.rows.following,
                        profilePicture: undefined,
                    })
                    // localStorage.setItem("username", response.data.info.username);
                    // localStorage.setItem("firstname", response.data.info.firstname);
                    localStorage.setItem('firstname', response.data.details.rows.firstName)
                    localStorage.setItem('lastname', response.data.details.rows.lastName)

                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }

            }).catch(error => {
                console.log(error);
            });


        axios.defaults.withCredentials = true;
        console.log(token)
        console.log("data variable")
        let tweetData = {
            currentUsername
        }

        console.log(data)
        axios({
            method: 'get',
            url: 'http://' + config.hostname + ':3001/getTweets',
            tweetData,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('response from DB: ');
                    console.log(response.data);

                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
                this.setState({
                    tweets: response.data.details.rows.tweets,

                })
            }).catch(error => {
                console.log(error);
            });


        console.log(data)
        axios({
            method: 'get',
            url: 'http://' + config.hostname + ':3001/getLikes',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('response from DB: ');
                    console.log(response.data);

                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
                this.setState({
                    likes: response.data.details.rows.likes,

                })
            }).catch(error => {
                console.log(error);
            });



    }

    followersClickHandler = (e) => {
        e.preventDefault();
        this.setState({
            redirectToFollowers: true,
        })
    }

    followingClickHandler = (e) => {
        e.preventDefault();
        console.log("Handling following click handler")
        this.setState({
            redirectToFollowing: true,
        })
    }

    openEditProfileForm = () => {
        this.setState({
            showEditButtonModal: true,
        })
    }

    closeEditProfileModal = () => {
        this.setState({
            showEditButtonModal: false,
        })
    }

    saveEditProfileModal = (profileDetails) => {
        console.log("profileDetails")
        console.log(profileDetails)
        let username = localStorage.getItem('username');

        console.log("Getting details of user: ")
        console.log(username);
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token')
        console.log(token)
        console.log("data variable")
        let data = {
            profileDetails,
            username
        }

        console.log(data)
        axios({
            method: 'post',
            url: 'http://' + config.hostname + ':3001/updateProfile',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('response from DB: ');
                    console.log(response.data);

                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
                this.setState({
                    username: response.data.details.rows.username,
                    firstName: response.data.details.rows.firstName,
                    lastName: response.data.details.rows.lastName,
                    email: response.data.details.rows.email,
                    city: response.data.details.rows.city,
                    state: response.data.details.rows.state,
                    zipcode: response.data.details.rows.zipcode,
                    description: response.data.details.rows.description,
                    followers: response.data.details.rows.followers,
                    following: response.data.details.rows.following,
                    profilePicture: undefined,
                })
            }).catch(error => {
                console.log(error);
            });

    }

    getLikes = () => {
        let currentUsername = this.props.match.params.username;
        console.log("getLikes")

        console.log("Getting details of user: ")
        console.log(currentUsername);
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token')
        console.log(token)
        console.log("data variable")
        let data = {
            currentUsername
        }

        console.log(data)
        axios({
            method: 'get',
            url: 'http://' + config.hostname + ':3001/getLikes',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('response from DB: ');
                    console.log(response.data);

                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
                this.setState({
                    likes: response.data.details.rows.likes,

                })
            }).catch(error => {
                console.log(error);
            });


    }

    getTweets = () => {
        let currentUsername = this.props.match.params.username;
        console.log("getTweets")

        console.log("Getting details of user: ")
        console.log(currentUsername);
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token')
        console.log(token)
        console.log("data variable")
        let data = {
            currentUsername
        }

        console.log(data)
        axios({
            method: 'get',
            url: 'http://' + config.hostname + ':3001/getTweets',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('response from DB: ');
                    console.log(response.data);

                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
                this.setState({
                    tweets: response.data.details.rows.tweets,

                })
            }).catch(error => {
                console.log(error);
            });


    }

    render() {
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
            { label: 'Logout', link: '/delete', className: "fa fa-sign-out" },

        ];

        if (this.state.redirectToFollowers) {
            console.log("Printing state information before redirecting");
            console.log(this.state);
            let currentUsername = this.props.match.params.username;
            return (
            <Redirect
                to={{
                    pathname: '/followers',
                    state: 
                        {
                            followers: this.state.followers,
                            showFollowers: true,
                            currentUsername: currentUsername,
                        }
                }}
            />);
        } else if (this.state.redirectToFollowing) {
            console.log("Printing state information before redirecting to following");
            console.log(this.state);            
            return (
            <Redirect
                to={{
                    pathName: '/following',
                    state: 
                        {   
                            following: this.state.following,
                            showFollowers: false,
                        },
                }}
            />);
        }

        let EditProfileFormDOM = [];
        if (this.state.showEditButtonModal) {

            EditProfileFormDOM = <EditProfileForm
                onClose={this.closeEditProfileModal}
                onSave={this.saveEditProfileModal}
                profileInfo={this.state}
            />;

        }
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>
                    </Col>
                    <Col className="col-sm-6">
                        <div>
                            <b>{this.state.firstName}</b>
                            <p>number of tweets</p>

                        </div>

                        <div>
                            <img className="coverImageStyle" src={coverImage} alt="twitterCoverPage" />
                            <Row>
                                <Col xs={6} md={4}>
                                    <Row>
                                        <img className="img-thumbnail" src={coverImage} />
                                    </Row>
                                    <row>
                                        {EditProfileFormDOM}
                                    </row>
                                </Col>
                                <Col xs={8} >
                                    <Button className="editButton" onClick={this.openEditProfileForm} label="Edit Profile">{this.state.thisButton}</Button>
                                </Col>
                            </Row>
                            <div>
                                <p>@{this.state.username}</p>
                                <p><b>Bio: </b><i>{this.state.description}</i></p>

                                <p><b>Location: </b>{this.state.city}</p>
                                <Row>
                                    <a href="/follow" onClick={this.followersClickHandler}
                                        style={
                                            {
                                                paddingRight: '10px',
                                            }
                                        }>{this.state.followers.length} Followers</a>
                                    <a href="/follow" onClick={this.followingClickHandler}>{this.state.following.length} Following</a> 
                                </Row>
                            </div>
                            <div>
                                <Tabs defaultActiveKey="profile" id="profileTweets">

                                    <Tab className="profileTab" onSelect={this.getTweets} eventKey="tweets" title="Tweets">

                                    </Tab>
                                    <Tab eventKey="replies" title="Retweets" className="profileTab">

                                    </Tab>
                                    <Tab eventKey="likes" title="Likes" onSelect={this.getLikes} className="profileTab">

                                    </Tab>
                                </Tabs>
                            </div>
                        </div>

                        <div>

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

export default UserProfile
