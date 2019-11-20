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
            <div>
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
                            </Col>
                            <Col>
                                <Form.Control placeholder="Password" />
                                <h6 varient="light">Forget Password?</h6>

                            </Col>
                            <Col>
                                <Button variant="primary">Login</Button>
                            </Col>
                            
                        </Form.Row>
                        <Row>
                            <h2>See what's happening in the world now</h2>
                        </Row>
                    </Form>
                    </Container>
                </Col>

            </div>
        )
        //LandingPage
    }
}

export default LandingPage
