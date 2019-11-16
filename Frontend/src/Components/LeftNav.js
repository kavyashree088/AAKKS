import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import "../CSS/navbar.css"

export default class LeftNav extends Component {
    render() {
        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup = link.active ? (
                <a className="side-link active">
                    <span className={link.className} style={{ marginRight: "10px" }} href={link.link}></span>
                    <span><b>{link.label}</b></span>
                </a>
            ) : (
                    <a className="side-link">
                        <span className={link.className} style={{ marginRight: "10px" }} href={link.link}></span>
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
                    <a className="side-link">
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