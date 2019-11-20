import React, { Component } from 'react'
import GettingStarted from './GettingStarted'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import image from './twitterLandingPage.png'
import './../../CSS/LandingPage.css'
import './../../CSS/Signup.css'
import Form from 'react-bootstrap/Form'

class LandingPage extends Component {
    render() {
        return (
            <Container>
                <Col sm={8}>
                    <div className="imgbox">
                        <img className="left-fit" src={image} alt="twitterLandingPage" />
                    </div>
                </Col>
                <Col sm ={4}>
                    <Form className="input">
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="Username" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Password" />
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>

            </Container>
        )
        //LandingPage
    }
}

export default LandingPage
