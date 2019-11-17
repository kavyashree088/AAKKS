import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";

class Explore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: ""
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
    render() {
        let links = [
            { label: 'Home', link: '/', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag", active: true },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '#home', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '#home', className: "fas fa-user-circle" },
            { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>

                    </Col>
                    <Col className="col-sm-6 pt-3">
                        <InputGroup className="ip2">
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
                        </InputGroup>
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