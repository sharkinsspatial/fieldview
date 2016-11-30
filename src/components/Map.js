import React from 'react'
import mapboxgl from 'mapbox-gl'
import Classnames from 'classnames'
import isequal from 'lodash.isequal'

var Map = React.createClass({
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
            <div id='map' style={mapStyle}></div>
            </div>
        )
    },

    componentDidMount: function() {
        mapboxgl.accessToken = 'mapboxKey'
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/infraredbaron/ciiq70k5700av8tm0wzlv38i5',
            center: [-119.76975111490768,
              45.7758644387534], // starting position
            zoom: 12,
            maxZoom: 18// starting zoom
        })
        if (this.props.FieldStore.activeField) {
            this.fitBounds(this.props.FieldStore.activeField.bounds, true)
        }
        let map = this.map
        map.addControl(new mapboxgl.Navigation())
        map.addControl(new mapboxgl.Geolocate());
        this.addSelectFieldControl()
        map.off('source.error', map.onError);
        map.off('tile.error', map.onError);
        map.on('source.error', () => {
            this.props.ImageActions.sendMapboxError()
        })
        map.on('load', () => {
            this.renderCurrentProps()
        })
    },

    addSelectFieldControl() {
        let container = document.querySelector('.mapboxgl-ctrl-top-left')
        let controlGroup = document.createElement('div')
        controlGroup.className = 'mapboxgl-ctrl-group mapboxgl-ctrl'
        let button = document.createElement('button')
        button.className = 'mapboxgl-ctrl-icon selectfield-ctrl'

        button.addEventListener('click', () => {
            button.classList.add('active')
            this.map.getCanvas().style.cursor = 'pointer'
            this.map.once('mousedown', (event) => {
                button.classList.remove('active')
                this.map.getCanvas().style.cursor = ''
                let features = this.map.queryRenderedFeatures(event.point)
                if (features.length > 0) {
                    this.selectField(features[0].properties.id)
                }
            })
        })
        controlGroup.appendChild(button)
        container.appendChild(controlGroup)
    },

    selectField(id) {
        if (this.props.FieldStore.fields) {
            this.props.FieldActions.setActiveField(id)
        }
    },

    renderCurrentProps() {
        let activeProduct = this.props.ImageStore.activeProduct
        if (activeProduct) {
            this.addImagery(activeProduct)
        }

        let dateFieldIds = this.props.ImageStore.dateFieldIds
        this.setLabelFilter(dateFieldIds)
    },

    addImagery(product) {
        this.removeImagery()
        if (product) {
            this.map.addSource('imagery', {
                "type": "raster",
                "url": `mapbox://infraredbaron.${product.id}`,
                "tileSize": 512
            });
            this.map.addLayer({
                "id": "imagery",
                "type": "raster",
                "source": "imagery"
            }, 'fields')
        }
    },

    removeImagery() {
        let imageryLayer = this.map.getLayer('imagery')
        if (imageryLayer) {
            this.map.removeLayer('imagery')
            this.map.removeSource('imagery')
        }
    },

    setLabelFilter(dateFieldIds) {
        let noFilter = ['!=', 'id', 0]
        let filter = ['all', ['in', 'id'].concat(dateFieldIds)]
        if (dateFieldIds && dateFieldIds.length !== 0) {
            this.map.setFilter('fields', filter )
            this.map.setFilter('labels', filter )
        } else {
            this.map.setFilter('fields', noFilter )
            this.map.setFilter('labels', noFilter )
        }
    },

    fitBounds(bounds, initial) {
        let options = {padding: 100}
        if (initial) {
            options.duration = 0
        }
        this.map.fitBounds(bounds, options)
    },

    componentWillReceiveProps(nextProps) {
        let field = this.props.FieldStore.activeField
        let fieldId = field ? field.id : null
        let nextField = nextProps.FieldStore.activeField
        let nextFieldId = nextField ? nextField.id : null
        let product = this.props.ImageStore.activeProduct
        let productId = product ? product.id : null
        let nextProduct = nextProps.ImageStore.activeProduct
        let nextProductId = nextProduct ? nextProduct.id : null
        let dateFieldIds = this.props.ImageStore.dateFieldIds
        let nextDateFieldIds = nextProps.ImageStore.dateFieldIds

        if (fieldId !== nextFieldId) {
            this.removeImagery()
            if (nextField) {
                this.fitBounds(nextField.bounds, false)
            }
        }
        if (productId !== nextProductId) {
            this.addImagery(nextProduct)
        }
        if (!isequal(dateFieldIds, nextDateFieldIds)) {
            this.setLabelFilter(nextDateFieldIds)
        }
    }
});

export default Map
