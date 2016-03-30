import React from 'react'
import mapboxgl from 'mapbox-gl'
import Classnames from 'classnames'
import Compare from 'mapbox-gl-compare'
import isequal from 'lodash.isequal'

var MapCompare = React.createClass({
    render: function() {
        var mapStyle = {
            position: 'absolute',
            top:0,
            bottom:0,
            width:'95%'
        }
        let classes = Classnames({
            'map': true
        })
        return (
            <div className={classes}>
                <div id='before' style={mapStyle}></div>
                <div id='after' style={mapStyle}></div>
            </div>
        )
    },
    componentDidMount: function() {
        mapboxgl.accessToken = 'mapboxKey'
        window.mapboxgl = mapboxgl
        let style = 'mapbox://styles/infraredbaron/ciiq70k5700av8tm0wzlv38i5'
        let center = [-119.76975111490768, 45.7758644387534]
        let zoom = 12
        let maxZoom = 17
        this.before = new mapboxgl.Map({
            container: 'before',
            style: style,
            center: center,
            zoom: zoom,
            maxZoom: maxZoom
        })
        this.after = new mapboxgl.Map({
            container: 'after',
            style: style,
            center: center,
            zoom: zoom,
            maxZoom: maxZoom
        })

        this.manageEvents(this.before)
        this.manageEvents(this.after)
        new Compare(this.before, this.after)
    },

    manageEvents: function(map) {
        map.off('source.error', map.onError);
        map.off('tile.error', map.onError);
        map.on('source.error', () => {
            this.props.ImageActions.sendMapboxError()
        })
        map.on('load', () => {
            this.renderCurrentProps()
        })
    },

    renderCurrentProps() {
        let activeField = this.props.FieldStore.activeField
        if (activeField) {
            this.before.fitBounds(activeField.bounds, {padding: 100})
            this.after.fitBounds(activeField.bounds, {padding: 100})
        }
        let productBefore = this.props.ImageStore.compareProductBefore
        if (productBefore) {
            this.addImagery(this.before, productBefore)
        }

        let afterProduct = this.props.ImageStore.compareProductAfter
        if (afterProduct) {
            this.addImagery(this.after, afterProduct)
        }
    },

    addImagery(map, product) {
        this.removeImagery(map)
        if (product) {
            map.addSource('imagery', {
                "type": "raster",
                "url": `mapbox://infraredbaron.${product.id}`,
                    "tileSize": 256
            });
            map.addLayer({
                "id": "imagery",
                "type": "raster",
                "source": "imagery"
            }, 'fields')
        }
    },

    removeImagery(map) {
        let imageryLayer = map.getLayer('imagery')
        if (imageryLayer) {
            map.removeLayer('imagery')
            map.removeSource('imagery')
        }
    },

    componentWillReceiveProps(nextProps) {
        let field = this.props.FieldStore.activeField
        let fieldId = field ? field.id : null
        let nextField = nextProps.FieldStore.activeField
        let nextFieldId = nextField ? nextField.id : null
        let compareProductBefore = this.props.ImageStore.compareProductBefore
        let nextCompareProductBefore = nextProps.ImageStore.compareProductBefore
        let compareProductAfter = this.props.ImageStore.compareProductAfter
        let nextCompareProductAfter = nextProps.ImageStore.compareProductAfter
        //let product = this.props.ImageStore.activeProduct
        //let productId = product ? product.id : null
        //let nextProduct = nextProps.ImageStore.activeProduct
        //let nextProductId = nextProduct ? nextProduct.id : null
        //let dateFieldIds = this.props.ImageStore.dateFieldIds
        //let nextDateFieldIds = nextProps.ImageStore.dateFieldIds

        if (fieldId !== nextFieldId) {
            this.removeImagery(this.before)
            this.removeImagery(this.after)
            if (nextField) {
                this.before.fitBounds(nextField.bounds, {padding: 100})
                this.after.fitBounds(nextField.bounds, {padding: 100})
            }
        }

        if (!isequal(compareProductBefore, nextCompareProductBefore)) {
            this.addImagery(this.before, nextCompareProductBefore)
        }

        if (!isequal(compareProductAfter, nextCompareProductAfter)) {
            this.addImagery(this.after, nextCompareProductAfter)
        }
        //if (productId !== nextProductId) {
            //this.addImagery(nextProduct)
        //}
    }


})

export default MapCompare
