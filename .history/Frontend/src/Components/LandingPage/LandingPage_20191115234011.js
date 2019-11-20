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
                 <style>
        * {
            margin: 0;
            padding: 0;
        }
        .imgbox {
            display: grid;
            height: 100%;
        }
        .center-fit {
            max-width: 100%;
            max-height: 100vh;
            margin: auto;
        }
    </style>
            <img class = {imageStyle} src ={image} alt="twitterLandingPage" />
            </Container>
        )
        //LandingPage
    }
}

export default LandingPage
