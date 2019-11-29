import React, { Component } from 'react'


import { Row, Col } from 'react-bootstrap'
import LeftNav from './LeftNav';


export class DeactivateAccount extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deactivate: false,
            firstname:'',
        }

        // this.deactivateChangeHandler = this.deactivateChangeHandler.bind(this)
        // this.yesButtonOnSubmit = this.yesButtonOnSubmit.bind(this)

    }

    componentWillMount = () =>{
        this.setState({
            firstname: localStorage.getItem('firstname'),
        })
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
                        </div>

                        <div>
                            <h3>
                            This will deactivate your account
                            </h3>
                            
                            <p>
                            You’re about to start the process of deactivating your Twitter account. 
                            Your display name, <b>@{this.state.username}</b>, and public profile will no longer be viewable on Twitter.com, 
                            Twitter for iOS, or Twitter for Android.
                            </p>
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
