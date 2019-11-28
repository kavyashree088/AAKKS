import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './../../CSS/navbar.css'
import LeftNav from './../LeftNav';


export class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            city: '',
            state:'',
            zipcode:'',
            userPassword: '',
            userImage: undefined,
            readonly: '',
            updateDone: false,
        }
       // this.updateProfile = this.updateProfile.bind(this);
    }


    render() {
        let links = [
            { label: 'Home', link: '/', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },

            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile', className: "fas fa-user-circle" },
            { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];

        return (
            <div>
                <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>
                </Col>
                user profile
            </div>
        )
    }
}

export default UserProfile
