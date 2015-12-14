import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Classnames from 'classnames'

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
            style: 'mapbox://styles/mapbox/satellite-v8', //stylesheet location
            center: [-119.76975111490768,
              45.7758644387534], // starting position
            zoom: 12 // starting zoom
        })
        let map = this.map
        map.addControl(new mapboxgl.Navigation())
        map.on('style.load', function () {
            map.addSource('fields', {
                type: 'vector',
                url: 'mapbox://infraredbaron.b6prazr2',
                minzoom: '11'
            })
            map.addSource('test', {
                "type": "raster",
                "url": "mapbox://infraredbaron.b2ym3l9f",
                "tileSize": 256
            });
            map.addLayer({
                "id": "field-fills",
                "type": "fill",
                "source": "fields",
                "source-layer": "fields",
                "layout": {},
                "paint": {
                    "fill-color": "#627BC1",
                    "fill-opacity": 0.9
                }
            })
            map.addLayer({
                "id": "field-borders",
                "type": "line",
                "source": "fields",
                "source-layer": "fields",
                "layout": {},
                "paint": {
                    "line-color": "#627BC1",
                    "line-width": 1.5
                }
            })
            map.addLayer({
                "id": "test",
                "type": "raster",
                "source": "test",
                "minzoom": 12
            }, 'field-borders')
        })
    },

    componentWillUnmount: function() {
        this.map.remove()
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
    }
});

export default Map
