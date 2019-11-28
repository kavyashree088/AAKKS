import React, { Component } from 'react'

export class UserProfile extends Component {
    render() {
        constructor(props) {
            super(props)
    
            this.state = {
                buyerName: '',
                buyerEmailId: '',
                buyerAddress: '',
                buyerPassword: '',
                buyerPhone: '',
                buyerId: '',
                buyerImage: undefined,
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
