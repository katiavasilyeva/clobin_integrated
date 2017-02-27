import React, {Component} from 'react';
const evtNames = ['dragend'];
let latestPosition = {};
let count = 0;
class NewLocationMarker extends Component{
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
    componentDidUpdate(nextProps) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        if (this.marker && !this.props.addNew &&
            this.props.addNew !== nextProps.addNew && this.props.newLocationSubmitted) {
            this.marker.setMap(null);
            count = 0;
        }
        if (this.props.confirmed && !this.props.newLocationSubmitted){
            if(count===0){
                this.getLatestPosition();
                count =1;
                this.renderNewBin(latestPosition);
            }else{
                this.renderNewBin(latestPosition);
            }
        }
        if (this.props.map !== nextProps.map ||
            this.props.newBinLocation !== nextProps.newBinLocation
            && this.props.addNew && !this.props.newLocationSubmitted
            && !this.props.confirmed
        ) {
            count = 0;
            this.renderNewBin(this.props.newBinLocation)
        }
    }
    renderNewBin(location){
        let {
            map, google
        } = this.props;
        let pos = location;
        const position = new google.maps.LatLng(pos.lat, pos.lng);
        const pref = {
            map: map,
            position: position,
            draggable:this.props.newBoxLocationDraggable,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        };
        this.marker = new google.maps.Marker(pref);
        evtNames.map(e => {
            this.marker.addListener(e, this.handleEvent(e));
        });
    }
    reverseGeocode(location){
        let google = this.props.google;
        let getNewBoxAddress = this.props.onGetNewBoxAddress;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': location}, function(results, status) {
            if (status === 'OK') {
                if (results) {
                    const address = (results[0].formatted_address);
                    getNewBoxAddress(address);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }});
    };

    handleEvent(evt) {
        return (e) => {
            const evtName = `on${this.camelize(evt)}`;
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.props.map, e);
            }
        }
    }
    getLatestPosition(){
        const lat = this.marker.getPosition().lat();
        const lng = this.marker.getPosition().lng();
        latestPosition = {lat: lat, lng: lng};
        this.props.getNewBoxLocation(latestPosition);
        this.reverseGeocode(latestPosition);
    }
    render(){
        return null;
    }
}
NewLocationMarker.propTypes = {
    onDragend : React.PropTypes.func
};
NewLocationMarker.defaultProps = {
    onDragend () {}
};
export default NewLocationMarker;

