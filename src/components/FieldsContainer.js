import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import FieldStore from '../stores/FieldStore'
import FieldActions from '../actions/FieldActions'
import Fields from './Fields'

var FieldsContainer = React.createClass({
    render() {
        return (
            <AltContainer store={FieldStore} actions={FieldActions}>
                <Fields/>
            </AltContainer>
        )
    }
})

export default FieldsContainer
