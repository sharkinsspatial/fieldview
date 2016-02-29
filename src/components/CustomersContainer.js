import React from 'react'
import AltContainer from 'alt-container'
import AuthenticationStore from '../stores/AuthenticationStore'
import AuthenticationActions from '../actions/AuthenticationActions'
import Customers from './Customers'
import {History} from 'react-router'

var CustomersContainer = React.createClass({
    mixins: [History],
    render() {
        return (
            <AltContainer store={AuthenticationStore} actions={AuthenticationActions}>
                <Customers history={this.context.history}/>
            </AltContainer>
        )
    }
})

export default CustomersContainer
