import React, { Component } from 'react'
import GettingStarted from './GettingStarted'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import image from './twitterLandingPage.png'
import imageStyle from './../../CSS/LandingPage.css'

class LandingPage extends Component {
    render() {
        return (
            <Container>
                
                
            <img class = {imageStyle} src ={image} alt="twitterLandingPage" />
            </Container>
        )
        //LandingPage
    }
}

export default LandingPage
