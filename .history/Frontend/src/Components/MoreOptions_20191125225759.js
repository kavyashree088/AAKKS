import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'

export class MoreOptions extends Component {
    render() {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default MoreOptions
