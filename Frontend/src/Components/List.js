import React, { Component, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "reactstrap";
import "../CSS/navbar.css";
import "../CSS/List.css";
import LeftNav from "./LeftNav";
import classnames from "classnames";
import { TabProvider, Tab, Tabs, TabPanel, TabList } from "react-web-tabs";
//import "react-web-tabs/dist/react-web-tabs.css";

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
            Owned
          </Tab>

          <Tab style={{ width: "33%" }} tabFor="two">
            Subscribed
          </Tab>

          <Tab style={{ width: "33%" }} tabFor="three">
           Member
          </Tab>
        </TabList>

        <TabPanel tabId="one">
          <p>Tab 1 content</p>
        </TabPanel>

        <TabPanel tabId="two">
          <p>Tab 2 content</p>
        </TabPanel>

        <TabPanel tabId="three">
          <p>Tab 3 content</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

class List extends Component {
  render() {
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
          <Col className="col-sm-6">
            <Container>
              <div className="css-1dbjc4n">
                <div class="css-1dbjc4n r-aqfbo4 r-14lw9ot r-my5ep6 r-rull8r r-qklmqi r-gtdqiz r-ipm5af r-1g40b8q">
                  Hi I am here
                </div>
                <a class="css-4rbku5 css-18t94o4 css-1dbjc4n r-1niwhzg r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1loqt21 r-1w2pmg r-1vuscfd r-53xb7h r-mk0yit r-o7ynqc r-6416eg r-lrvibr">
                  Hi
                </a>
              </div>
              <ListTabs />
            </Container>
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

export default List;
