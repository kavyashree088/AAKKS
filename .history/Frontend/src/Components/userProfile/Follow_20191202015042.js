import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import "../../CSS/navbar.css"
import LeftNav from "../LeftNav";

import TweetContent from "../TweetContent";

class Followers extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeKey: "Followers",
            followers: [],
            following: [],
        }
    }

    componentWillMount = () => {
        let showFollowers = this.props.location.state.showFollowers;
        let followers = [];
        let following = [];
        let index = 0;
        if (showFollowers) {
            let followersArr = this.props.location.state.followers;
            for (index = 0; index < followersArr; index++) {
                let username = followersArr[index];
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
                            followers.push({
                                username: response.data.details.rows.username,
                                firstName: response.data.details.rows.firstName,
                                lastName: response.data.details.rows.lastName,
                                email: response.data.details.rows.email,
                                city: response.data.details.rows.city,
                                state: response.data.details.rows.state,
                                zipcode: response.data.details.rows.zipcode,
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
                followers = followers,
            })
        } else {
            let followingArr = this.props.location.state.following;
            for (index = 0; index < followersArr; index++) {
                let username = followersArr[index];
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
                            followers.push({
                                username: response.data.details.rows.username,
                                firstName: response.data.details.rows.firstName,
                                lastName: response.data.details.rows.lastName,
                                email: response.data.details.rows.email,
                                city: response.data.details.rows.city,
                                state: response.data.details.rows.state,
                                zipcode: response.data.details.rows.zipcode,
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
                followers = followers,
            })
        }
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
                        <Tabs defaultActiveKey={this.state.activeKey} mountOnEnter={true} unmountOnExit={true}>
                            <Tab eventKey="Followers" title="Followers">
                            </Tab>
                            <Tab eventKey="Following" title="Following">
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

export default Followers;