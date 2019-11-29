import React, { Component } from "react";
import "../CSS/navbar.css"
import Dropdown from 'react-bootstrap/Dropdown'
import config from './../Config/settings'
import axios from 'axios';


export default class LeftNav extends Component {

    //delete an account
    //deactivate an account
    //Logout

    constructor(props) {
        super(props)
    
        this.state = {
            redirectPageName : undefined, 
            deleteAccountFlag: true,
            deactivateAccountFlag : true
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleDeactivateAccount = this.handleDeactivateAccount.bind(this);
    }


    handleLogout = () => {
        localStorage.clear();
        console.log("Local Storage cleared!");
        window.location = "/";
    }

    handleDeactivateAccount = (e) =>{
        let username = localStorage.getItem('username')
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://' + config.hostname + ':'+ config.port + '/deactivateAccount', username)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("Response from Sign Up " + response);
                console.log(response);
                if (response.data.deactivate === true) {
                    
                    this.setState({
                        message: "Account successfully Deactivated",
                        deactivateAccountFlag: true
                    })
                } else {
                    this.setState({
                        message: "Account Deactivation Failed",
                        deactivateAccountFlag: false
                    })
                }
            });
    }


    





    render() {
        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup = link.active ? (
                <a className="side-link active" href={link.link}>
                    <span className={link.className} style={{ marginRight: "10px" }} ></span>
                    <span><b>{link.label}</b></span>
                </a>
            ) : (
                    <a className="side-link" href={link.link}>
                        <span className={link.className} style={{ marginRight: "10px" }} ></span>
                        <span><b>{link.label}</b></span>
                    </a>
                );

            return (
                link.active ? (<li key={index} className="navbar-side-item active">
                    {linkMarkup}
                </li>) : (<li key={index} className="navbar-side-item">
                    {linkMarkup}
                </li>)
            );
        });
        return (
            <div className="navbar-side" id="navbarSide" >
                <li className="navbar-side-item">
                    <a style={{
                        paddingLeft: "2rem"
                    }} href="/">
                        <span className="fab fa-twitter" style={{
                            marginRight: "10px",
                            fontSize: "2rem",
                            color: "rgba(29,161,242,1.00)"
                        }}></span>
                    </a>
                </li>

                {linksMarkup}
                
                
            </div >
        )
    }
}