import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl, Image, Form, Modal } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import profile from "../Images/kavya.jpg"
import profileAlias from "../Images/profileAlias.jpeg"

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: "",
            newMessageFlag: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearch = (event) => {
        if (event.key === "Enter") {
            console.log(this.state.searchText)
        }
    }

    handleNewMessage = () => {
        this.setState({
            newMessageFlag: true
        })
    }
    handleClose = () => {
        this.setState({
            newMessageFlag: false
        })
    }
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope", active: true },
            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile', className: "fas fa-user-circle" },
            { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];
        return (
            <div>
                <Row style={{
                    overflowX: "hidden"
                }}>
                    <Col className="col-sm-3 fixed">
                        <LeftNav links={links} ></LeftNav>

                    </Col>
                    <Col className="col-sm-3 pt-3 fixed" >
                        <h4><b>Messages</b><i className="fas fa-edit float-right message" onClick={this.handleNewMessage} ></i></h4>
                        <hr></hr>
                        <div className="messageActive">
                            <Image src={profile} style={{
                                height: "40px",
                                width: "40px"
                            }} roundedCircle alt=""></Image>
                            <b className="padLeft">Kavya</b>
                            <b className="padLeft lightFont">@KavyashreeC</b>
                        </div>
                        <hr />
                    </Col>
                    <Col className="col-sm-6" style={{
                        borderLeft: " 2px solid rgb(180, 177, 177)",
                        height: "100%",
                        width: "50%",
                        position: "fixed",
                        top: "0",
                        right: "0",
                        padding: "0"
                    }}>
                        <div className="pt-3 padLeft">
                            <h4 className="padLeft"><b>Kavya</b></h4>
                            <b className="padLeft lightFont">@KavyashreeC</b>
                            <hr></hr>
                        </div>
                        <InputGroup className="messageText">
                            <FormControl></FormControl>

                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-greater-than"></i></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                    </Col>
                </Row>
                <Modal show={this.state.newMessageFlag} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="ip2">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="searchText"
                                placeholder="Search people"
                            />
                        </InputGroup>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Messages;