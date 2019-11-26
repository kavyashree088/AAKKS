import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink
} from "reactstrap";
class ReplyModal extends Component{

    constructor(props){

        super(props);
    }

    render() { 
      return (
        
          <div class="modal fade" id="replyModal">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title"></h4>
                  <br />
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
  
                <div class="modal-body"> 
                  
                  <div class="tweet-container">
                    <div class="tweet-body">
                      <Card >
                        <CardBody>
                            <CardTitle style={{fontWeight:"bolder"}}>Times Now<span style={{color:"grey",fontWeight:"normal"}}> @timesnow</span></CardTitle>
                            {/* <CardSubtitle>Card subtitle</CardSubtitle>
                        
                        {<img width="100%" src="/assets/318x180.svg" alt="Card image cap" />}
                        */}
                            
                            <CardText>oneplus says hit by data breach, usernames, addresses leaked.</CardText>
                            <CardLink href="#"> Link1</CardLink>
                            <CardLink href="#"> Link2</CardLink>
                            <br/><br/>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <br/><p style={{color:"grey"}}>replying to @timeNow</p>
                  </div>      
                  <div>
                      <textarea id="tweetArea" className="form-control" rows="4" style={{borderColor:"white",fontSize:"21px"}} placeholder="Tweet Your Reply" autoFocus></textarea>
                  </div>
                </div>
  
                <div class="modal-footer">
                  <i id="image" style={{position:'absolute',  left:'60px'}} class="far fa-image fa-2x"></i>
                  <button className="btn btn-primary btn-circle" type="submit" style={{position:'absolute',  right:'60px',fontWeight:"bold"   }}>Reply</button><br/><br/><br/>  
                </div>

              </div>
            </div>
          </div>
        
      );
    }
}

export default ReplyModal;

