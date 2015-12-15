import React from 'react'
import FieldsContainer from './FieldsContainer'
import ImagesContainer from './ImagesContainer'

var ImageSelector = React.createClass({
    render() {
        return (
            <div>
                <FieldsContainer/>
                <ImagesContainer/>
            </div>
        )
    }
})

export default ImageSelector
