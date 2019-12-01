import React, { Component } from "react";
import {
  Row,
  Col
} from "react-bootstrap";
import "../CSS/navbar.css";
import "../CSS/List.css";
import LeftNav from "./LeftNav";
import BookmarkTweets from './BookmarkTweets' ;

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class BookmarkMain extends Component {
  constructor(props) {
    super(props);
   
    
  }
 

  render() {
    let links = [
      { label: "Home", link: "/", className: "fas fa-home", active: true },
      { label: "Explore", link: "/Explore", className: "fas fa-hashtag" },
      { label: "Notifications", link: "#home", className: "fas fa-bell" },
      { label: "Messages", link: "/Messages", className: "fas fa-envelope" },
      { label: "Bookmarks", link: "/Bookmarks", className: "fas fa-bookmark" },
      { label: "Lists", link: "/List", className: "fas fa-list-alt" },
      { label: "Profile", link: "#home", className: "fas fa-user-circle" },
      { label: "More", link: "#home", className: "fas fas fa-ellipsis-h" }
    ];

      
    return (
      <div>
        <Row>
          <Col className="col-sm-3 removePadding">
            <LeftNav links={links}></LeftNav>
          </Col>
          <Col className="col-sm-6 removePadding">
 <BookmarkTweets/>
          </Col>
          <Col className="col-sm-3">
            <div class="navbar-side-right" id="navbarSide">
              here
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BookmarkMain;
