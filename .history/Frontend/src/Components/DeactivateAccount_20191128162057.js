import React, { Component } from 'react'


import { Row, Col } from 'react-bootstrap'
import LeftNav from './LeftNav';
import Button from 'react-bootstrap/Button'


export class DeactivateAccount extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deactivate: false,
            firstname:'',
            username:'',
        }
        
        this.deactivateButton = this.deactivateButton.bind(this)

    }

    componentWillMount = () =>{
        this.setState({
            firstname: localStorage.getItem('firstname'),
            username: localStorage.getItem('username'),
        })
    }


    deactivateButton = () => {

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
                            <br></br>
                            <p>
                            You’re about to start the process of deactivating your Twitter account. 
                            Your display name, <b>@{this.state.username}</b>, and public profile will no longer be viewable on Twitter.com, 
                            Twitter for iOS, or Twitter for Android.
                            </p>
                            <center>
                            <Button variant="danger">Deactivate</Button>
                            </center>
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
