import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './../../CSS/navbar.css'
import LeftNav from '../LeftNav';
import coverImage from './CoverPhoto.jpg'
import './../../CSS/ProfilePage.css'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


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
            userImage: undefined,
            isUser: true,
            updateDone: false,

        }
        // this.updateProfile = this.updateProfile.bind(this);
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
                            <Col xs={6} md={4}>
                                <img className="img-thumbnail" src={coverImage} />
                                <Modal.Dialog>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modal title</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <p>Modal body text goes here.</p>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary">Close</Button>
                                        <Button variant="primary">Save changes</Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </Col>
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
