import React, {Component,PropTypes} from 'react';
let count = 0;
let position = {};
class Marker extends Component {
    componentDidUpdate(prevProps) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)
            && this.props.update) {
            this.renderMarker(this.props.position);
            count = 0
        }
        else if (!this.props.update && count ===0 || (this.props.boxes !== prevProps.boxes)) {
            position = prevProps.position;
            count = 1;
            this.renderMarker(position);
        }
        else if(count !== 0){
            this.renderMarker(position);
        }
    }
    renderMarker(location) {
        let {
            map, google
        } = this.props;

        let pos = location;
        const position = new google.maps.LatLng(pos.lat, pos.lng);
        const pref = {
            map: map,
            position: position,
            cursor:'grab'

        };
        this.marker = new google.maps.Marker(pref);
    }

    render(){
        return null;
    }
}

Marker.propTypes = {
    position: React.PropTypes.object,
    map: React.PropTypes.object
};

export default Marker