import React, { Component } from 'react'
import GettingStarted from './GettingStarted'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import image from './twitterLandingPage.png'
import './../../CSS/LandingPage.css'
import './../../CSS/Signup.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
                    <Container>
                    <Form className="input">
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="Username" />
                                <p varient="light">Forget Password</p>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Password" />
                            </Col>
                            <Col>
                                <Button variant="primary">Login</Button>
                            </Col>
                            
                        </Form.Row>
                    </Form>
                    </Container>
                </Col>

            </Container>
        )
        //LandingPage
    }
}

export default LandingPage
