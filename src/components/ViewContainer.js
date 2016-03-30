import React from 'react'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import MapContainer from './MapContainer'
import MapCompareContainer from './MapCompareContainer'
import SlidesContainer from './SlidesContainer'

var View = React.createClass({
    render() {
        if (this.props.mapView) {
            if (this.props.mapCompareView) {
               return (
                   <MapCompareContainer/>
               )
            }
            else {
                return (
                    <MapContainer/>
                )
            }
        }
        else {
            return (
                <SlidesContainer/>
            )
        }
    }
})

var ViewContainer = React.createClass({
    render() {
        return (
            <AltContainer store={ImageStore}>
                <View/>
            </AltContainer>
        )
    }

})

export default ViewContainer
