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


import axios from 'axios';
import { Redirect } from 'react-router'
import config from './../../Config/settings.js'


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
            profilePicture: undefined,
            isUser: true,
            updateDone: false,
            showEditButtonModal:false,
            thisButton:"Edit Profile"

        }
        // this.updateProfile = this.updateProfile.bind(this);
        this.closeEditProfileModal=this.closeEditProfileModal.bind(this)
        this.saveEditProfileModal=this.saveEditProfileModal.bind(this)
        this.openEditProfileForm = this.openEditProfileForm.bind(this)

    }


    componentWillMount = () => {

        // let username = localStorage.getItem('username');
        // // let currentUsername


        // console.log("Getting details of user: " + username);
        // axios.defaults.withCredentials = true;
        // axios.post('http://' + config.hostname + ':'+ config.port + '/getProfile', username)
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log('response from DB: ');
        //             console.log(response.data);
        //             menu.push(...response.data.menu);
        //             sections.push(...response.data.sections);
        //             restaurantDetails = response.data.restaurantDetails;
        //         } else {
        //             console.log("Status Code: ", response.status);
        //             console.log(response.data.responseMessage);
        //         }
        //         this.setState({
        //             restaurantId: cookie.load('cookie1'),
        //             restaurantDetails: restaurantDetails,
        //             sections: sections,
        //             items: menu,
        //         })
        //     }).catch(error => {
        //         console.log(error);
        //     });
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
        
        // let restaurantId = cookie.load('cookie1');
        // console.log("restaurant Id")
        // console.log(restaurantId)
        // axios.defaults.withCredentials = true;
        // axios.post('http://3.133.92.239:3001/restaurantSection', {
        //     restaurantId: restaurantId,
        //     sectionName: sectionName,
        // }).then(response => {
        //     if (response.status === 200) {
        //         console.log('Successfully added the section');
        //         // alert('successfully added the section');
        //         this.setState({
        //             sections: this.state.sections.concat(sectionName),
        //             showMenuSectionAddModal: false,
        //         })
        //     } else {
        //         alert('failed to add section');
        //         console.log('Failed to add the section');
        //     }
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },

            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile', className: "fas fa-user-circle" },
            { label: 'More', link: '/MoreOptions', className: "fas fas fa-ellipsis-h" }
        ];
       
        let EditProfileFormDOM = [];

        if (this.state.showEditButtonModal){
            
                EditProfileFormDOM = <EditProfileForm
                    onClose={this.closeEditprofileModal}
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
                            {this.state.firstName}
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
                            <Col xs={4} >
                                <Button style={{float: 'right'}} className = "button" onClick ={this.openEditProfileForm} label="Edit Profile">{this.state.thisButton}</Button>
                            </Col>
                            </Row>
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
