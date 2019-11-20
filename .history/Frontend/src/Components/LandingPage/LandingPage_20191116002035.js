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

                <div className="imgbox">
                  
                </div>

                <Form className = "input">
                    <Form.Row>
                        <Col>
                            <Form.Control placeholder="First name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Last name" />
                        </Col>
                    </Form.Row>
                </Form>

            </Container>
        )
        //LandingPage
    }
}

export default LandingPage
