import React, { Component } from 'react'

export class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            firstName:'',
            lastName:'',
            email: '',
            state: '',
            city:'',
            zipcode:'',
            userPassword: '',
            profileImage: '',
            updateDone: false,
        }
       
        this.updateProfile = this.updateProfile.bind(this);
    }
    render() {
        return (
            <div>
                profile page
            </div>
        )
    }
}

export default UserProfile
