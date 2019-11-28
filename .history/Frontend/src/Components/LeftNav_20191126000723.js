import React, { Component } from "react";
import "../CSS/navbar.css"
import Dropdown from 'react-bootstrap/Dropdown'

export default class LeftNav extends Component {
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
                <Dropdown>
                    <Dropdown.Toggle  className = "fas fas fa-ellipsis-h" >
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div >
        )
    }
}