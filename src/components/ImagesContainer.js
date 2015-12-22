import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import Images from './Images'
import Products from './Products'

var ImagesContainer = React.createClass({
    render() {
        return (
            <AltContainer store={ImageStore} actions={ImageActions}>
                <Images/>
                <Products/>
            </AltContainer>
        )
    }
})

export default ImagesContainer
