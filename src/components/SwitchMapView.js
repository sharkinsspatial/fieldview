import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import classNames from 'classnames'

var SwitchMapView = React.createClass({
    render() {
        let textClass = classNames({
            'text-center': true,
            'textPadding': true
        })
        let label = this.props.mapView ? 'Slide View' : 'Map View'
        return (
            <div className={textClass}>
                <Button bsStyle='primary' onClick={this.handleClick}>{label}</Button>
            </div>
        )
    },

    handleClick() {
        this.props.setMapView(!this.props.mapView)
    },

    componentWillUnmount() {
        this.props.setMapView(true)
    }
})

export default SwitchMapView
