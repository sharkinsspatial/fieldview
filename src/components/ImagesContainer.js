import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import Images from './Images'

var ImagesContainer = React.createClass({
    render() {
        return (
            <AltContainer store={ImageStore} actions={ImageActions}>
                <Images/>
            </AltContainer>
        )
    }
})

export default ImagesContainer
