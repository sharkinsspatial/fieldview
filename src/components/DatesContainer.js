import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import Dates from './Dates'

var DatesContainer = React.createClass({
    render() {
        return (
            <AltContainer store={ImageStore} actions={ImageActions}>
                <Dates/>
            </AltContainer>
        )
    }
})

export default DatesContainer
