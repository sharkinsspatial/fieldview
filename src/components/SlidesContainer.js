import React from 'react'
import Image from 'react-bootstrap/lib/Image'
import geoViewport from 'geo-viewport'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import Dimensions from 'react-dimensions'
import classNames from 'classnames'

var Slides = React.createClass({
    getInitialState() {
        let loading = this.props.activeProduct ? true : false
        return { loading: loading }
    },

    render() {
        let loadingClass = classNames({
            'fa': true,
            'fa-refresh': this.state.loading,
            'fa-spin': this.state.loading,
            'fa-5x': true,
            'loading': true
        })

        let staticUrl = ''
        let width = this.props.containerWidth
        let height = this.props.containerHeight
        if (this.props.mapboxJSON) {
            let metadata = this.props.mapboxJSON
            let bounds = geoViewport.viewport(
                metadata.bounds, [width, height], metadata.minzoom,
                metadata.maxzoom
            )
            staticUrl = `https://api.mapbox.com/v4/${metadata.id}/${bounds.center[0]},` +
            `${bounds.center[1]},${bounds.zoom}/${width}x${height}@2x.png` +
            `?access_token=${this.props.mapboxToken}`
        }
        return (<div><i className={loadingClass}/><Image onLoad={this.onLoad} src={staticUrl} responsive/></div>)
    },

    onLoad() {
        this.setState({ loading: false })
    },

    componentWillReceiveProps(nextProps) {
        let product = this.props.activeProduct
        let productId = product ? product.id : null
        let nextProduct = nextProps.activeProduct
        let nextProductId = nextProduct ? nextProduct.id : null
        if (productId !== nextProductId) {
            this.setState({ loading: true})
        }
    }
})

var SlidesDimensions = Dimensions()(Slides)

var SlidesContainer = React.createClass({
    render: function() {
        return (
            <AltContainer store={ImageStore}>
                <SlidesDimensions/>
            </AltContainer>
        )
    }
})

export default SlidesContainer
