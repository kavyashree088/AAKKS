import React, { Component } from 'react'

export class DeactivateAccount extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deactivate: false
        }

        // this.deactivateChangeHandler = this.deactivateChangeHandler.bind(this)
        // this.yesButtonOnSubmit = this.yesButtonOnSubmit.bind(this)

    }

    
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },

            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/'+localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" },
            { label: 'Logout', link: '/',  className: "fa fa-sign-out" },

        ];
        return (
            <div>
                deactivate
            </div>
        )
    }
}

export default DeactivateAccount
