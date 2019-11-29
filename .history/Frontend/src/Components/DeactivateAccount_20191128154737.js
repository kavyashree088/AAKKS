import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export class DeactivateAccount extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deactivate: false
        }

        // this.deactivateChangeHandler = this.deactivateChangeHandler.bind(this)
        // this.yesButtonOnSubmit = this.yesButtonOnSubmit.bind(this)

    }

    
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },

            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/'+localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" },
            { label: 'Logout', link: '/',  className: "fa fa-sign-out" },

        ];
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
                                <p>{this.state.description}</p>
                                <p>{this.state.city}</p>
                                <Row>
                                    <p>followers count   .</p>

                                    <p> following count</p>
                                </Row>
                            </div>
                            <div>
                                <Tabs  defaultActiveKey="profile" id="profileTweets">
                                    
                                    <Tab  className = "profileTab" eventKey="tweets" title="Tweets">
                                        
                                    </Tab>
                                    <Tab eventKey="replies" title="Retweets" className = "profileTab">
                                        
                                    </Tab>
                                    <Tab eventKey="likes" title="Likes" className = "profileTab">
                                        
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

export default DeactivateAccount
