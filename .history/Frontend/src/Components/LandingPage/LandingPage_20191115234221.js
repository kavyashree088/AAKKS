import React, { Component } from 'react'
import GettingStarted from './GettingStarted'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import image from './twitterLandingPage.png'
import './../../CSS/LandingPage.css'

class LandingPage extends Component {
    render() {
        return (
            <Container>
                
            <div className = "imgbox">
                <img className = "center-fit" src ={image} alt="twitterLandingPage" />
            </div>
           
            </Container>
        )
        //LandingPage
    }
}

export default LandingPage
