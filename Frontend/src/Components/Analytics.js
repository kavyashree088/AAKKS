import React, { Component } from "react";
import 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import GraphBar from './Graphs/GraphBar';

class Analytics extends Component {

    render(){

        return(
            <div>
                <div>
                    <Navbar bg="light" >
                        <Navbar.Brand href="#home">
                            <a style={{
                            paddingLeft: "2rem"
                            }} href="/">

                            <span className="fab fa-twitter" style={{
                            marginRight: "10px",
                            fontSize: "2rem",
                            color: "rgba(29,161,242,1.00)"
                            }}></span>
                        </a>

                        </Navbar.Brand>
                    <h5>Analytics</h5>
                    </Navbar>
                </div>
                <div style={{width:'500px',marginLeft:'auto',marginRight:'auto'}}>
                    <div>
                        <GraphBar/>
                    </div>
                    <br/>
                    <br/>  
                    <div>
                
                    </div>
                </div>
                     <div></div>    
                <div style={{display:'inline-block',float:'left'}}>
                    <div>
                    
                    </div>
                    <br/>
                    <br/>
                    <div>
                
                    </div>
                </div>
                
                <div style={{display:'inline-block',float:'left'}}>
                    <div>
                    <br/>
                    <br/>
                    
                    l
                    </div>
                
                </div>
                <br/>
                <br/>

            </div>
      );
    }
    
}

export default Analytics;
