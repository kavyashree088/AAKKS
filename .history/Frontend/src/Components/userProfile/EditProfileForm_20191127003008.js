
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export class EditProfileForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: true,
            username: '',
            email: '',
            city: '',
            state: '',
            zipcode: '',
            firstName:'',
            lastName:'',
            description:'',
            profilePicture: undefined,
            isUser: true,
            updateDone: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this)
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this)
        
        this.cityChangeHandler = this.cityChangeHandler.bind(this)
        this.stateChangeHandler = this.stateChangeHandler.bind(this)
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this)
        this.descriptionChangeHandler = this.descriptionChangeHandler(this)
    }

    componentDidMount = () => {
        this.setState({
            username: this.props.username,
            city: this.props.city,
            state: this.props.state,
            zipcode: this.props.zipcode,
            firstName:this.props.firstName,
            lastName:this.props.lastName,
            description:this.props.description,
            profilePicture: this.props.profilePicture,
        })
    }

    firstNameChangeHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }
    lastNameChangeHandler = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }

    descriptionChangeHandler = (e)=>{
        this.setState({
            description: e.target.value
        })
    }
    handleClose = (e, closeCallback) => {
        this.setState({
            show: false
        })
        closeCallback();
    }

    handleSave = (e, saveCallback) => {
        console.log('Saving Menu Item -- In Modal');
        console.log(e);
        this.setState({
            show: false
        })
        saveCallback(this.state);
    }

    onPicUpload = (e) => {
        this.setState({
            itemImage: e.target.files[0],
        })
    }

  
    render() {

        let imageDiv = (<div className='buttons fadein'>
            <div className='button'>
                <label htmlFor='single'>
                    <img src={this.state.profilePicture} alt="Profile pic" height="40px" width="60px" ></img>
                </label>
                {/* <input type='file' id='single' name="selectedFile" onChange={this.onPicUpload} style={{ height: "0px", width: "0px" }} accept="image/x-png,image/gif,image/jpeg" /> */}
            </div>
        </div>);

        return (
            <div>
                <Modal show={this.state.show} onHide={(e) => {
                    this.handleClose(e, this.props.onClose);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange={this.firstNameChangeHandler} type="text" placeholder="first name" />
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control onChange={this.lastNameChangeHandler} type="text" placeholder="last name" />
                            </Form.Group>
                            <Form.Group controlId="formItemDesc">
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control onChange={this.itemDescChangeHandler} type="text" placeholder="item name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPrice">
                                <Form.Label>Item Price</Form.Label>
                                <Form.Control onChange={this.itemPriceChangeHandler} type="text" placeholder="0.00" />
                            </Form.Group>
                            {/* <Form.Group controlId="forBasicSection">
                                <Form.Label>Item Section</Form.Label>
                                <Form.Check onChange={this.itemSectionChangeHandler} id="appetizer" type="radio" label="Appetizers" />
                                <Form.Check onChange={this.itemSectionChangeHandler} id="lunch" type="radio" label="Lunch" />
                                <Form.Check onChange={this.itemSectionChangeHandler} id="breakfast" type="radio" label="Breakfast" />
                            </Form.Group> */}

                            <Form.Group controlId='buyerImage'>
                                <Form.Label>Menu Item Image</Form.Label>
                                {imageDiv}
                                <Form.Control as='input' type='file' onChange={this.onPicUpload} />
                            </Form.Group>
                            {/* <Form.Group controlId="forBasicSection">
                                <Form.Label>Item Cuisine</Form.Label>
                                <Form.Control onChange={this.itemCuisineChangeHandler} type="text" placeholder="Italian..." />
                            </Form.Group> */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => {
                            this.handleClose(e, this.props.onClose)
                        }}>Close</Button>
                        <Button type="submit" variant="primary" onClick={(e) => {
                            this.handleSave(e, this.props.onSave)
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default EditProfileForm
