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
            buyerImage: '',
            updateDone: false,
        }
       
        this.updateProfile = this.updateProfile.bind(this);
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default UserProfile
