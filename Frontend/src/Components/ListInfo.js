import React, { Component, useState } from "react";
import {
  Row,
  Col,
  Container,
  FormControl,
  Modal,
  InputGroup,
  Form,
  Image,
  FormGroup,
  Button,
  ButtonGroup
} from "react-bootstrap";
import { Input } from "reactstrap";
import "../CSS/navbar.css";
import "../CSS/List.css";
import LeftNav from "./LeftNav";
import classnames from "classnames";
import { TabProvider, Tab, Tabs, TabPanel, TabList } from "react-web-tabs";
//import "react-web-tabs/dist/react-web-tabs.css";
import axios from "axios";
import { hostAddress, port } from "../Constants/index";
//import Modal from "react-modal";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

const ListTabs = props => {
  return (
    <div>
      <Tabs
        defaultTab="one"
        onChange={tabId => {
          console.log(tabId);
        }}
      >
        <TabList>
          <Tab style={{ width: "33%" }} tabFor="one">
            Tweets
          </Tab>

          <Tab style={{ width: "33%" }} tabFor="two">
            Members
          </Tab>

          <Tab style={{ width: "33%" }} tabFor="three">
            Subscribers
          </Tab>
        </TabList>

        <TabPanel tabId="one">
          <p>Tab 1 content</p>
        </TabPanel>

        <TabPanel tabId="two">
          <p>Tab 2 content</p>
          <h2 className="sub-heading element-animate mb-5">
            Many valuable information regarding the public health and welfare,
            disease outbreaks and their trend are available in the form of
            unstructured data lying in different news portals, Facebook,
            Twitter. It becomes important to become aware of the current
            diseases and to filter out relevant and correct information. This is
            especially important for commercial pharmacies as their need to be
            updated with the current outbreak in their region and also be ready
            stock-wise for the drugs needed to treat them. Our objective with
            Well-Pharma is to address this problem and built a system for the
            pharmacies which will analyse the disease outbreaks in all regions
            and carry out a disease-to-drug mapping and alert the pharmacist so
            as to keep the stock ready. WellPharma will be a Web Application -
            built as an automated system for querying filtering and visualising
            the disease outbreak and to stock their respective drugs.
          </h2>
        </TabPanel>

        <TabPanel tabId="three">
          <p>Tab 3 content</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

let showFlag = false;

class ListInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: "",
      description: "",

      infoShow: false,
      members: []
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createList = e => {
    //prevent page from refresh
    console.log("Hi there I am in list info");
    e.preventDefault();
    // const data = {
    //   listname: this.state.listname,
    //   creator:localStorage.getItem('username'),
    //   description: this.state.description,
    //   members: this.state.members
    // };
    // console.log(data)
    // //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios
    //   .post("http://" + hostAddress + ":" + port + "/createList/createList", data,config)
    //   .then(response => {
    //     console.log("Status Code : ", response.status);
    //     alert(response.data.msg);
    //     this.handleClose();
    // })
  };

  render() {
    let display = null;
    // if(this.state.listCreatorID==localStorage.getItem(username))
    if (false) {
      display = (
        <div>
          <div style={{ marginTop: "2%" }}>
            <span>
              <i className="fas fa-arrow-left" onClick={this.goBack}></i>
            </span>
            <span
              style={{ paddingTop: "2%", marginLeft: "7%", fontSize: "23px" }}
            >
              <b>Lists</b>
            </span>
            <span>
              <button
                style={{
                  backgroundColor: "rgba(29, 161, 242, 1)",
                  float: "right",
                  margin: "0 4%",
                  display: { showFlag },
                  borderRadius: "12px",
                  color: "white",
                  padding: "8px"
                }}
              >
                {" "}
                <b>Save</b>
              </button>
            </span>
          </div>

          <hr></hr>
          <InputGroup className="ip2">
            <FormControl
              onChange={this.inputChangeHandler}
              name="listname"
              placeholder="Name"
              style={{
                backgroundColor: "rgb(245, 250, 258)",
                borderBottom: "solid black 1px",
                height: "50px"
              }}
            />
          </InputGroup>
          <div style={{ padding: "4%" }}></div>
          <InputGroup className="ip2">
            <FormControl
              onChange={this.inputChangeHandler}
              name="description"
              placeholder="Description"
              style={{
                backgroundColor: "rgb(245, 250, 258)",
                borderBottom: "solid black 1px",
                height: "50px"
              }}
            />
          </InputGroup>
          <br></br>
          <hr style={{ weight: "50px" }}></hr>
          <span style={{ paddingTop: "2%", fontSize: "23px" }}>
            <b>People</b>
          </span>
          <hr></hr>

          <div>
            <button className="listbutton">
              {" "}
              <span>Members</span>
              <span style={{ float: "right" }}>1</span>
            </button>
            <button className="listbutton">
              {" "}
              <span>Subscribers</span>
              <span style={{ float: "right" }}>1</span>
            </button>
          </div>
          <button className="listbutton1">
            {" "}
            <b>Add Member</b>
          </button>
          <hr></hr>
          <button className="listbutton2">
            {" "}
            <b>Delete List</b>
          </button>
        </div>
      );
    } else {
      display = (
        <div>
          <div style={{ marginTop: "2%" }}>
            <span>
              <i className="fas fa-arrow-left" onClick={this.goBack}></i>
            </span>

            <span
              style={{ marginLeft: "7%", paddingTop: "2%", fontSize: "23px" }}
            >
              <b>Lists</b>
            </span>
          </div>

          <hr></hr>

          <div
            style={{
              backgroundColor: "rgb(245, 250, 258)",
              borderBottom: "solid black 1px",
              height: "50px",
              padding: "10px"
            }}
          >
            {/* ENter Listname here */}
            listname
          </div>

          <div style={{ padding: "4%" }}></div>
          <div
            style={{
              backgroundColor: "rgb(245, 250, 258)",
              borderBottom: "solid black 1px",
              height: "50px",
              padding: "10px"
            }}
          >
            {/* ENter description here */}
            description
          </div>
          <br></br>
          <hr style={{ weight: "50px" }}></hr>
          <span style={{ paddingTop: "2%", fontSize: "23px" }}>
            <b>People</b>
          </span>
          <div>
            <button className="listbutton">
              {" "}
              <span>Members</span>
              <span style={{ float: "right" }}>1</span>
            </button>
            <button className="listbutton">
              {" "}
              <span>Subscribers</span>
              <span style={{ float: "right" }}>1</span>
            </button>
          </div>
          <hr></hr>
          <button className="listbutton1">
            {" "}
            <b>Subscribe</b>
          </button>
         
          
        </div>
      );
    }

    const { tags, suggestions } = this.state;
    let links = [
      { label: "Home", link: "/", className: "fas fa-home", active: true },
      { label: "Explore", link: "/Explore", className: "fas fa-hashtag" },
      { label: "Notifications", link: "#home", className: "fas fa-bell" },
      { label: "Messages", link: "/Messages", className: "fas fa-envelope" },
      { label: "Bookmarks", link: "#home", className: "fas fa-bookmark" },
      { label: "Lists", link: "#home", className: "fas fa-list-alt" },
      { label: "Profile", link: "#home", className: "fas fa-user-circle" },
      { label: "More", link: "#home", className: "fas fas fa-ellipsis-h" }
    ];

    return (
      <div>
        <Row>
          <Col className="col-sm-3">
            <LeftNav links={links}></LeftNav>
          </Col>
          <Col className="col-sm-6">{display}</Col>
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

export default ListInfo;
