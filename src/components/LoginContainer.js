import React from 'react'
import AltContainer from 'alt-container'
import AuthenticationStore from '../stores/AuthenticationStore'
import AuthenticationActions from '../actions/AuthenticationActions'
import Login from './Login'
import {History} from 'react-router'

var LoginContainer = React.createClass({
    mixins: [History],
    render() {
        return (
            <AltContainer store={AuthenticationStore} actions={AuthenticationActions}>
                <Login history={this.context.history}/>
            </AltContainer>
        )
    }
})

export default LoginContainer
