import React from 'react'
import AltContainer from 'alt-container'
import AuthenticationStore from '../stores/AuthenticationStore'
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand'

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
        var logo
        if (this.props.logo && this.props.logo !== 0) {
            var logoPath = `/css/${this.props.logo}.png`
            logo = <img className='logo-image' src={logoPath}/>
        }
        else {
            logo = <div></div>
        }
        return (
            <NavbarBrand>
                {logo}
            </NavbarBrand>
        )
    }
})

export default LogoContainer
