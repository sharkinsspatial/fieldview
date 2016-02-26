import React from 'react'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import FieldStore from '../stores/FieldStore'
import FieldActions from '../actions/FieldActions'
import Map from './Map'

var MapContainer = React.createClass({
    render() {
        return (
            <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
                actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
                <Map/>
            </AltContainer>
        )
    }
})

export default MapContainer
