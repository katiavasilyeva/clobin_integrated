import React, {Component} from 'react';
const evtNames = [ 'click','mouseover', 'dragend'];

class Boxes extends Component{
    shouldComponentUpdate(prevProps){
        if(this.props.boxesLength !== prevProps.boxesLength) {
            this.renderMarker();
            return true
        }
        else{
            return false;
        }
    };
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
    renderMarker() {
        let {
            map, google
        } = this.props;
        const boxMarkers = this.props.boxes.map((box,i) => {
            const newMarker = {
                content: box.content,
                pos: box.position,
                icon: box.icon
            };
            const position = new google.maps.LatLng(newMarker.pos.lat, newMarker.pos.lng);
            const pref = {
                map: map,
                position: position,
                icon: newMarker.icon,
                content: newMarker.content,
                clickable: true
            };
            this.marker = new google.maps.Marker(pref);
            evtNames.map(e => {
                this.marker.addListener(e, this.handleEvent(e,i));
            });
        });
    }
    handleEvent(evt,i) {
        return () => {
            const evtName = `on${this.camelize(evt)}`;
            if (this.props[evtName]) {
                this.props[evtName](this.props.boxes[i]);
                const boxClicked = this.props.boxes[i];
                this.props.onBoxSelect(i);
            }
        }
    }
    render(){
        return null;
    }
}
Boxes.propTypes = {
    onClick: React.PropTypes.func
};
Boxes.defaultProps = {
    onClick () {}
};
export default Boxes