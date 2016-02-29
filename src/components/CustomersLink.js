import React from 'react'
import AltContainer from 'alt-container'
import AuthenticationStore from '../stores/AuthenticationStore'
import NavItem from 'react-bootstrap/lib/NavItem'
import {LinkContainer} from 'react-router-bootstrap'

var CustomersLink = React.createClass({
    render() {
        return (
            <AltContainer stores={[AuthenticationStore]} inject={{
                disabled: () => {
                   return AuthenticationStore.getState().customers.length === 0 }
                }}>
                <LinkContainer to='/customers'>
                    <NavItem eventKey={3}>Customers</NavItem>
                </LinkContainer>
            </AltContainer>
        )
    }
})

export default CustomersLink
