import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Classnames from 'classnames'
import isequal from 'lodash.isequal'

var Map = React.createClass({
    //propTypes: {
    //view: React.PropTypes.object,
    //token: React.PropTypes.string
    //},

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
        var el = ReactDOM.findDOMNode()
        mapboxgl.accessToken = 'pk.eyJ1IjoiaW5mcmFyZWRiYXJvbiIsImEiOiJkYWI1NDk2OTZkMjhiOGJjYzkyYmUyYzI2N2EwOTk4ZCJ9.g0jIz6KRGU-mlwHvtfAvGg'
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/infraredbaron/ciiq70k5700av8tm0wzlv38i5',
            center: [-119.76975111490768,
              45.7758644387534], // starting position
            zoom: 12,
            maxZoom: 17// starting zoom
        })
        let map = this.map
        map.addControl(new mapboxgl.Navigation())
        this.addSelectFieldControl()
    },

    removeImagery() {
        let imageryLayer = this.map.getLayer('imagery')
        if (imageryLayer) {
            this.map.removeLayer('imagery')
            this.map.removeSource('imagery')
        }
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
                this.map.featuresAt(event.point, { radius: 5 },
                    (err, features) => {
                        if (features.length > 0) {
                            this.selectField(features[0].properties.id)
                        }
                    })
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
                this.map.fitBounds(nextField.bounds, {padding: 100})
            }
        }
        if (productId !== nextProductId) {
            this.removeImagery()
            if (nextProduct) {
                this.map.addSource('imagery', {
                    "type": "raster",
                    "url": `mapbox://infraredbaron.${nextProduct.id}`,
                        "tileSize": 256
                });
                this.map.addLayer({
                    "id": "imagery",
                    "type": "raster",
                    "source": "imagery"
                }, 'fields')
            }
        }
        if (!isequal(dateFieldIds, nextDateFieldIds)) {
            let noFilter = ['!=', 'id', 0]
            let filter = ['all', ['in', 'id'].concat(nextDateFieldIds)]
            if (nextDateFieldIds.length == 0) {
                this.map.setFilter('fields', noFilter )
                this.map.setFilter('labels', noFilter )
            } else {
                this.map.setFilter('fields', filter )
                this.map.setFilter('labels', filter )
            }
        }
    },

    componentWillUnmount: function() {
        this.map.remove()
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
    }
});

export default Map
