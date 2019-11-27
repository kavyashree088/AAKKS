import React, { Component, useState } from "react";
import {
  Row,
  Col,
  Modal,
  Form,
  Image
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
import {Redirect} from 'react-router';
import ReactTags from 'react-tag-autocomplete'

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};
class ListInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: "",
      description: "",
      members: [],
      tags:["alaukika"],
      suggestions:[],
      subscribers:[],
      goBackFlag:false,
      modalType:"",
      isModalOpen:false,
      changeFlag:false
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentWillMount(){
    const data = {
    };
    console.log(data);
    console.log("blehelhe");
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/addMember/addMember",
        data,
        config
      )
      .then(response => {
        console.log("Hello Member Data received:", response.data);
        var temp=[];
        response.data.map(user=>{
temp.push(user.username)
        })
        console.log(temp)
        this.setState({
          suggestions: temp
        });
      });
  }

  inputChangeHandler = e => {
    console.log("Hiiii");
   
    this.setState({
      [e.target.name]: e.target.value,
      changeFlag:true
    });
  };

  handleShowMember = () => {
    const data = {
      listID: this.props.location.state.list._id
    };
    console.log(data);
    console.log("blehelhe");
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/showMember/showMember",
        data,
        config
      )
      .then(response => {
        console.log("Hello Member Data received:", response.data);
        this.setState({
          modalType: "member",
          isModalOpen: true,
          members: this.state.members.concat(response.data)
        });
      });
  };
  handleShowSubscriber = () => {
    const data = {
      listID: this.props.location.state.list._id
    };
    console.log(data);
    console.log(this.props.location.state.list);
    //set the with credentials to true

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/showSubscriber/showSubscriber",
        data,
        config
      )
      .then(response => {
        console.log("Hello Subsc Data received:", response.data);
        this.setState({
          modalType: "subscriber",
          isModalOpen: true,
          subscribers: this.state.subscribers.concat(response.data)
        });
      });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
      modalType:"",
      subscribers: [],
      members: []
    });
  };

  saveList=e=>{
    if(this.state.changeFlag){
    const data = {
      listID: this.props.location.state.list._id,
      listname:this.state.listname,
      description:this.state.description,
    };
    console.log(data);
    console.log(this.props.location.state.list);
    //set the with credentials to true

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/updateList/updateList",
        data,
        config
      )
      .then(response => {
        console.log("Hello Subsc Data received:", response.data);
        this.setState({
          modalType: "",
          isModalOpen: false,
          goBackFlag: true,
          changeFlag:false
        });
      });
    }
  }

  handleAddMember=e=>{
    this.setState({
      modalType: "addMember",
      isModalOpen: true,
    })
  }


  deleteList=e=>{
   
      const data = {
        listID: this.props.location.state.list._id
      };
      console.log(data);
      console.log(this.props.location.state.list);
      //set the with credentials to true
  
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(
          "http://" + hostAddress + ":" + port + "/deleteList/deleteList",
          data,
          config
        )
        .then(response => {
          console.log("Hello delete Data received:", response.data);
          this.setState({
            modalType: "",
            isModalOpen: false,
            goBackFlag: true,
            changeFlag:false
          });
        });
      
  }

  goToBack = e => {
    this.setState({
      goBackFlag: true
    });
  
  };
  handleDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }
 
  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }
  
  render() {
    let showbutton=null;
    if(!this.state.changeFlag){
      showbutton=( <button onClick={this.saveList.bind(this)}
      disabled
        class="savebutton"
      >
        {" "}
        <b>Save</b>
      </button>);
    }else{
showbutton=( <button onClick={this.saveList.bind(this)}
class="savebutton">
  {" "}
  <b>Save</b>
</button>)
    }

    let modalTitle = "";
    let modalContent = null;
    let display2 = [];
    if (this.state.modalType=="subscriber") {
      modalTitle = "List Subscribers";

      if (this.state.subscribers.length != 0) {
        modalContent = this.state.subscribers.map(listItem => {
          display2.push(
            <div style={{ borderColor: "#808080" }}>
              <Image
                src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                style={{
                  height: "48px",
                  width: "48px",
                  margin: "8px"
                }}
                roundedCircle
                alt=""
              ></Image>

              <span>
                <b style={{ fontSize: "16px", marginRight: "8px" }}>
                  {listItem.firstName}
                </b>
              </span>
              <span>
                <b style={{ fontSize: "16px", marginRight: "8px" }}>
                  {listItem.lastName}
                </b>
              </span>
              <span style={{ fontSize: "14px", color: "#808080" }}>
                <b>@{listItem.username}</b>
              </span>
            </div>
          );
        });
      } else {
        display2.push(
          <div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>
              <b>There aren't any subscribers of this list</b>
            </div>
            <p style={{ textAlign: "center" }}>
              When people subscribe, they'll show up here.
            </p>
          </div>
        );
      }
    } else if(this.state.modalType=="member") {
      modalTitle = "List Members";

      if (this.state.members.length != 0) {
        modalContent = this.state.members.map(listItem => {
          display2.push(
            <div style={{ borderColor: "#808080" }}>
              <Image
                src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                style={{
                  height: "48px",
                  width: "48px",
                  margin: "8px"
                }}
                roundedCircle
                alt=""
              ></Image>

              <span>
                <b style={{ fontSize: "16px", marginRight: "8px" }}>
                  {listItem.firstName}
                </b>
              </span>
              <span>
                <b style={{ fontSize: "16px", marginRight: "8px" }}>
                  {listItem.lastName}
                </b>
              </span>
              <span style={{ fontSize: "14px", color: "#808080" }}>
                <b>@{listItem.username}</b>
              </span>
            </div>
          );
        });
      } else {
        display2.push(
          <div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>
              <b> There isn't anyone in this list</b>
            </div>
            <p style={{ textAlign: "center" }}>
              When people subscribe, they'll show up here.
            </p>
          </div>
        );
      }
    }else if(this.state.modalType=="addMember"){
      modalTitle = "Add Members";

      display2.push(<ReactTags
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)} />)

    }

    let redirec = null;
    if (this.state.goBackFlag) {
      redirec = <Redirect to="/List" />;
    }
    let display = null;
    // if(this.state.listCreatorID==localStorage.getItem(username))
    // if (false) {
    display = (
      <div>
        <div style={{ marginTop: "2%" }}>
          <span>
            <i className="fas fa-arrow-left" onClick={this.goToBack}></i>
          </span>
          <span
            style={{ paddingTop: "2%", marginLeft: "7%", fontSize: "23px" }}
          >
            <b>List Info</b>
          </span>
          <span>
           {showbutton}
          </span>
        </div>

        <hr></hr>
        <Form>
        <Input className="ip2"
         
            onChange={this.inputChangeHandler}
            name="listname"
           
            style={{borderRadius:"8px",
              backgroundColor: "rgb(252, 252, 255)",
              borderBottom: "solid black 1px",
              height: "50px"
            }}
            onChange={this.inputChangeHandler.bind(this)}
            placeholder={this.props.location.state.list.listname}
          />
       
        <div style={{ padding: "4%" }}></div>
        {/* <InputGroup className="ip2"> */}
         
          <Input className="ip2"
            onChange={this.inputChangeHandler}
            name="description"
            
            style={{
              borderRadius:"8px",
              backgroundColor: "rgb(252, 252, 255)",
              borderBottom: "solid black 1px",
              height: "50px"
            }}
            placeholder={this.props.location.state.list.description}
            onChange={this.inputChangeHandler.bind(this)}
          />
       
        </Form>
        <br></br>
        <hr style={{ weight: "50px" }}></hr>
        <span style={{ paddingTop: "2%", fontSize: "23px" }}>
          <b>People</b>
        </span>
        <hr></hr>

        <div>
          <button className="listbutton" onClick={this.handleShowMember}>
            {" "}
            <span>Members</span>
            <span style={{ float: "right" }}>
              <b>{this.props.location.state.list.memberID.length}</b>
            </span>
          </button>
          <button className="listbutton" onClick={this.handleShowSubscriber}>
            {" "}
            <span>Subscribers</span>
            {console.log(this.props.location.state.list)}
            <span style={{ float: "right" }}>
              <b>{this.props.location.state.list.subscriberID.length}</b>
            </span>
          </button>
        </div>
        <button className="listbutton1" onClick={this.handleAddMember}>
          {" "}
          <b>Add Member</b>
        </button>
        <hr></hr>
        <button className="listbutton2" onClick={this.deleteList.bind(this)}>
          {" "}
          <b>Delete List</b>
        </button>
      </div>
    );
    // } else {
    //   display = (
    //     <div>
    //       <div style={{ marginTop: "2%" }}>
    //         <span>
    //           <i className="fas fa-arrow-left" onClick={this.goBack}></i>
    //         </span>

    //         <span
    //           style={{ marginLeft: "7%", paddingTop: "2%", fontSize: "23px" }}
    //         >
    //           <b>Lists</b>
    //         </span>
    //       </div>

    //       <hr></hr>

    //       <div
    //         style={{
    //           backgroundColor: "rgb(245, 250, 258)",
    //           borderBottom: "solid black 1px",
    //           height: "50px",
    //           padding: "10px"
    //         }}
    //       >
    //         {/* ENter Listname here */}
    //         listname
    //       </div>

    //       <div style={{ padding: "4%" }}></div>
    //       <div
    //         style={{
    //           backgroundColor: "rgb(245, 250, 258)",
    //           borderBottom: "solid black 1px",
    //           height: "50px",
    //           padding: "10px"
    //         }}
    //       >
    //         {/* ENter description here */}
    //         description
    //       </div>
    //       <br></br>
    //       <hr style={{ weight: "50px" }}></hr>
    //       <span style={{ paddingTop: "2%", fontSize: "23px" }}>
    //         <b>People</b>
    //       </span>
    //       <div>
    //         <button className="listbutton">
    //           {" "}
    //           <span>Members</span>
    //           <span style={{ float: "right" }}>1</span>
    //         </button>
    //         <button className="listbutton">
    //           {" "}
    //           <span>Subscribers</span>
    //           <span style={{ float: "right" }}>1</span>
    //         </button>
    //       </div>
    //       <hr></hr>
    //       <button className="listbutton1">
    //         {" "}
    //         <b>Subscribe</b>
    //       </button>

    //     </div>
    //   );
    // }

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
          <Col className="col-sm-6">
            {display}
            {redirec}
          </Col>
          <Col className="col-sm-3">
            <div class="navbar-side-right" id="navbarSide">
              here
            </div>
          </Col>
        </Row>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {modalContent}
            {display2}
               </Modal.Body>
            </Modal>
      </div>
    );
  }
}


 export default ListInfo;

 
 
 
 