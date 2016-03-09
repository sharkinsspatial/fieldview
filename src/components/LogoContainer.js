import React from 'react'
import AltContainer from 'alt-container'
import AuthenticationStore from '../stores/AuthenticationStore'
import NavBrand from 'react-bootstrap/lib/NavBrand'

var LogoContainer = React.createClass({
    render() {
        return (
            <AltContainer store={AuthenticationStore}>
                <Logo/>
            </AltContainer>
        )
    }
})

var Logo = React.createClass({
    render() {
        return (
            <NavBrand>{this.props.logo}</NavBrand>
        )
    }
})

export default LogoContainer
