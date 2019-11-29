import React, { Component } from 'react'

export class UserProfile extends Component {
    render() {
        constructor(props) {
            super(props)
    
            this.state = {
                username: '',
                email: '',
                city: '',
                state:'',
                zipcode:'',
                userPassword: '',
                userImage: undefined,
                readonly: '',
                updateDone: false,
            }
            this.onPicUpload = this.onPicUpload.bind(this);
            this.updateProfile = this.updateProfile.bind(this);
        }

        return (
            <div>
                user profile
            </div>
        )
    }
}

export default UserProfile
