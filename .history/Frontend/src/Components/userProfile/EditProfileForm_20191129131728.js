
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
            firstName: '',
            lastName: '',
            description: '',
            profilePicture: undefined,
            isUser: true,
            updateDone: false,
            isValidMessage:"",
            valid: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this)
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this)

        this.cityChangeHandler = this.cityChangeHandler.bind(this)
        this.stateChangeHandler = this.stateChangeHandler.bind(this)
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this)
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this)
    }

    componentDidMount = () => {
        this.setState({
            username: this.props.profileInfo.username,
            city: this.props.profileInfo.city,
            state: this.props.profileInfo.state,
            zipcode: this.props.profileInfo.zipcode,
            firstName: this.props.profileInfo.firstName,
            lastName: this.props.profileInfo.lastName,
            description: this.props.profileInfo.description,
            profilePicture: this.props.profileInfo.profilePicture,
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
        let userInputState = e.target.value;
        const states = new Set([
            'al', 'alabama',
            'ak', 'alaska',
            'az', 'arizona',
            'ar', 'arkansas',
            'ca', 'california',
            'co', 'colorado',
            'ct', 'connecticut',
            'de', 'delaware',
            'dc', 'district of columbia',
            'fl', 'florida',
            'ga', 'georgia',
            'hi', 'hawaii',
            'id', 'idaho',
            'il', 'illinois',
            'in', 'indiana',
            'ia', 'iowa',
            'ks', 'kansas',
            'ky', 'kentucky',
            'la', 'louisiana',
            'me', 'maine',
            'md', 'maryland',
            'ma', 'massachusetts',
            'mi', 'michigan',
            'mn', 'minnesota',
            'ms', 'mississippi',
            'mo', 'missouri',
            'mt', 'montana',
            'ne', 'nebraska',
            'nv', 'nevada',
            'nh', 'new hampshire',
            'nj', 'new jersey',
            'nm', 'new mexico',
            'ny', 'new york',
            'nc', 'north carolina',
            'nd', 'north dakota',
            'oh', 'ohio',
            'ok', 'oklahoma',
            'or', 'oregon',
            'pa', 'pennsylvania',
            'ri', 'rhode island',
            'sc', 'south carolina',
            'sd', 'south dakota',
            'tn', 'tennessee',
            'tx', 'texas',
            'ut', 'utah',
            'vt', 'vermont',
            'va', 'virginia',
            'wa', 'washington',
            'wv', 'west virginia',
            'wi', 'wisconsin',
            'wy', 'wyoming'
        ]);  
        
        if (states.has(userInputState.toLowerCase()) === true) {
            console.log(userInputState.toLowerCase());
            this.setState({
                state: userInputState,
                isValidMessage:""
            })
        } else {
            this.setState({
                valid: false,
                isValidMessage: "Please enter valid State"
            })
        }
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    zipcodeChangeHandler = (e) => {
        var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.target.value);
        if (isValidZip){
            this.setState({
                //finishedSignUp: true,
                zipcode: e.target.value,
                isValidMessage: ""
            })
        }
        else {
            this.setState({
                valid: false,
                isValidMessage: "Please enter valid Zipcode"
            })
        }
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    handleClose = (e, closeCallback) => {
        this.setState({
            show: true
        })
        //debugger;
        closeCallback();
    }

    handleSave = (e, saveCallback) => {
        console.log('Saving Profile Details -- In Modal');
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
        console.log(this.props);
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
                <Modal show={this.state.show} id ="modalId" onHide={(e) => {
                    this.handleClose(e, this.props.onClose);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='profileImage'>
                                <Form.Label>Profile Picture</Form.Label>
                                {imageDiv}
                                <Form.Control as='input' type='file' onChange={this.onPicUpload} />
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange={this.firstNameChangeHandler} defaultValue={this.state.firstName} type="text" placeholder="first name" />
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control onChange={this.lastNameChangeHandler} defaultValue={this.state.lastName} type="text" placeholder="last name" />
                            </Form.Group>
                            <Form.Group controlId="formUserDesc">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control onChange={this.descriptionChangeHandler} defaultValue={this.state.description} type="text" placeholder="bio" />
                            </Form.Group>
                           
                            <Form.Group controlId="formUserCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control onChange={this.cityChangeHandler} defaultValue={this.state.city} type="text" placeholder="city" />
                            </Form.Group>
                            <Form.Group controlId="formUserState">
                                <Form.Label>State</Form.Label>
                                <Form.Control onChange={this.stateChangeHandler} defaultValue={this.state.state} type="text" placeholder="state" />
                            </Form.Group>
                            <Form.Group controlId="formUserZipcode">
                                <Form.Label>Zip code</Form.Label>
                                <Form.Control onChange={this.zipcodeChangeHandler} defaultValue={this.state.zipcode} type="text" placeholder="zipcode" />
                            </Form.Group>




                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"  onClick={(e) => {
                            this.handleClose(e, this.props.onClose);
                            window.$('modalId').modal('hide');
                        }} >Close </Button>
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
