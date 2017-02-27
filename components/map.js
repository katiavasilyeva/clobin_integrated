import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
const evtNames = ['dblclick'];
import SearchBar from './search-bar'
class GoogleMap extends React.Component {
    //passes down state to all of the children
    renderChildren() {
        const {children} = this.props;
        if (!children) return(null);
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                zoom:this.props.zoom,
                position: this.props.currentLocation,
                boxes: this.props.boxes,
                boxesLength: this.props.boxesLength,
                update: this.props.updatePositionMarker,
                newBinLocation:this.props.newBoxLocation,
                addNew: this.props.addNewLocation,
                newBoxLocationDraggable:this.props.newBoxLocationDraggable,
                confirmed: this.props.confirmedNewLocation,
                newLocationSubmitted: this.props.newLocationSubmitted,
                getNewBoxLocation: this.props.getNewBoxLocation,
                onGetNewBoxAddress: this.props.onGetNewBoxAddress
            });
        })
    }
    // tell the map when to update
    componentDidUpdate(prevProps) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevProps.currentLocation !== this.props.currentLocation  || prevProps.zoom !== this.props.zoom) {
            this.recenterMap();
        }
    }
    // re-centers map to current location
    recenterMap() {
        const map = this.map;
        let curr =  this.props.currentLocation;

        const google = this.props.google;
        const maps = google.maps;
        const zoom = this.props.zoom;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
            map.setZoom(zoom)
        }
    }
    // loads the map
    camelize(word) {
        const str = JSON.stringify(word);
        let eventName = '';
        for (let char of str) {
            if (char !== '"') {
                eventName = eventName + char
            }
        }
        const event = eventName.charAt(0).toUpperCase() + eventName.slice(1);
        return event;
    }
    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const zoom = this.props.zoom;
            const {lat, lng} = this.props.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                options:{streetViewControl:false,mapTypeControl:false,styles: [
                    {
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#bdbdbd"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#c9c9c9"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#bbe5ff"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    }
                ],disableDoubleClickZoom: true}
            });
            this.map = new maps.Map(node, mapConfig);
            evtNames.forEach(e => {
                this.map.addListener(e, this.handleEvent(e));
            });
        }
    }
    handleEvent(evt) {
        return (e) => {
            const evtName = `on${this.camelize(evt)}`;
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.map, e);
                if(this.props.addNewLocation){
                    const newLat = e.latLng.lat();
                    const newLng = e.latLng.lng();
                    this.map.setZoom(16);
                    const newLocation = {lat:newLat,lng:newLng};
                    this.props.getNewBoxLocation(newLocation);
                }
            }
        }
    }
    // renders the component
    render() {
        const style = {
            width: '100%',
            height: 500,
        };
        return (
			<div>
                <SearchBar
                    className = 'search-bar'
                    google = {this.props.google}
                    map = {this.map}
                    onSearchedAddress={this.props.onSearchedAddress }
                />
				<div
					style={style}
					ref='map'>
					Loading map...
                    {this.renderChildren()}
				</div>
			</div>
        )
    }

}
GoogleMap.propTypes = {
    onDblclick: React.PropTypes.func
};
GoogleMap.defaultProps = {
    onDblclick () {}
};
export default GoogleMap