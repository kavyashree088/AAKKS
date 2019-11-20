import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import image from './twitterLandingPage.png'
import './../../CSS/LandingPage.css'
import './../../CSS/Signup.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButtonGroup'

class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userNamel: "",
            userPassword: "",
            SignedUpFlag: false,
            message: "",
        }

        this.userNameChangeHandler = this.userNameChangeHandler.bind(this)
        this.userPasswordChangeHandler = this.userPasswordChangeHandler.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }

    buyerEmailIdChangeHandler = (e) => {
        this.setState({
            buyerEmailId: e.target.value
        })
    }
    buyerPasswordChangeHandler = (e) => {
        this.setState({
            buyerPassword: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Col sm={7}>
                    <div className="imgbox">
                        <img className="left-fit" src={image} alt="twitterLandingPage" />
                    </div>
                </Col>
                <Col sm={5}>
                    <Container>
                        <Form className="input">
                            <Form.Row>
                                <Col>
                                    <Form.Control placeholder="Username" />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Password" />
                                    <h6 className="password">Forget Password?</h6>

                                </Col>
                                <Col>
                                    <Button className = "button" >Login</Button>
                                </Col>

                            </Form.Row>
                            <div className = "signup">
                                <span className="fab fa-twitter" style={{
                                    marginRight: "10px",
                                    fontSize: "2rem",
                                    color: "rgba(29,161,242,1.00)"
                                }}></span>
                                <h2 className = "font">See what's happening in the world now</h2>
                                
                                <h5>Join Twitter today.</h5>

                                <Button className = "button" block>
                                    Sign up
                                </Button>

                            </div>

                        </Form>
                    </Container>
                </Col>

            </div>
        )
        //LandingPage
    }
}

export default LandingPage
