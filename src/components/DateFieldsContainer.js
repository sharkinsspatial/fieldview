import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import FieldStore from '../stores/FieldStore'
import FieldActions from '../actions/FieldActions'
import Dates from './Dates'
import DateFields from './DateFields'

var DateFieldsContainer = React.createClass({
    render() {
        return (
            <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
                actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
                <Dates/>
                <DateFields/>
            </AltContainer>
        )
    }
})

export default DateFieldsContainer
