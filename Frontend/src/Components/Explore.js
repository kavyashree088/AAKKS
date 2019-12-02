import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl, Accordion, Card, Image, Dropdown } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import config from './../Config/settings'
import axios from 'axios';

class Explore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: "",
            allUsers: [],
            searchList: []
        }
    }

    componentWillMount() {
        if (localStorage.getItem('username')) {
            axios({
                method: 'get',
                url: 'http://' + config.hostname + ':3001/allUsers',
            }).then(response => {
                console.log(response)
                this.setState({ allUsers: response.data.details.rows });
            })
        } else {
            this.props.history.push("/");
        }
    }
    handleChange = (event) => {
        let list;
        if (event.target.value === "") {
            list = []
        } else {
            list = this.state.allUsers.filter(user =>
                user.username.includes(event.target.value))
        }
        this.setState({
            [event.target.name]: event.target.value,
            searchList: list
        })
    }

    handleSearch = (event) => {
        if (event.key === "Enter") {
            console.log(this.state.searchText)
        }
    }

    addDefaultSrc = (event) => {
        console.log("error")
        event.target.onError = null;
        event.target.src = `https://${config.imageurl}/profileAlias.jpeg`
    }

    selectUser = (user) => (event) => {
        if (user.username === localStorage.getItem("username")) {
            this.props.history.push('/profile/' + localStorage.getItem('username'));
        } else {
            this.props.history.push({
                pathname: "/userDetailsPage/" + user.username,
                state: { user: user }
            });
        }

    }
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag", active: true },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }
        ];

        let serachDisplay = this.state.searchList.map(user => {
            return (
                <Dropdown.Item eventKey={user.username} onClick={this.selectUser(user)}>
                    <div>
                        <Image src={`https://${config.imageurl}/${user.profilePicture}`} style={{
                            height: "40px",
                            width: "40px",
                            marginRight: "10px"
                        }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                        <b>{user.firstName}</b>
                    </div>
                    <b className="padLeft lightFont" style={{
                        paddingLeft: "10px"
                    }}>@{user.username}</b>
                    <hr />
                </Dropdown.Item>
            )
        })
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} history={this.props.history}></LeftNav>

                    </Col>
                    <Col className="col-sm-6 pt-3">
                        <Dropdown className="btn-block" style={{ maxHeight: "28px" }}>
                            <Dropdown.Toggle as={InputGroup}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="searchText"
                                    placeholder="Search Twitter"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleSearch}

                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                                {(this.state.searchText.startsWith('#')) ? (
                                    <div>
                                        <Card.Body style={{
                                            width: "400px"
                                        }}>
                                            Searching for #Tags
                                    </Card.Body>
                                    </div>
                                ) : (<div>{this.state.searchList.length > 0 ? (
                                    <Card.Body style={{
                                        maxHeight: "400px",
                                        width: "400px",
                                        overflowY: "auto"
                                    }}>
                                        {serachDisplay}
                                    </Card.Body>
                                ) : (<Card.Body style={{ width: "400px" }}>{this.state.searchText.length > 0 ? (
                                    <div>No users with search text</div>
                                ) : (
                                        <div>Try Searching for people and topics</div>
                                    )}</Card.Body>)}</div>)}
                            </Dropdown.Menu>
                        </Dropdown>
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

export default Explore;