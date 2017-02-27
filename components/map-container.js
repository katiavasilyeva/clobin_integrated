import React from 'react';
import GoogleMap from './map'
import {GoogleApiWrapper} from 'google-maps-react'
import Marker from './position-marker'
import Boxes from './boxes'
import InfoPanel from './slideup-container'
import NewLocationMarker from './new-location-marker'
import ConfirmNewLocation from './confirm-new-location-button'

import firebase from 'firebase';

export class MapContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            currentLocation:{
                lat: 43.6532,
                lng: -79.3832
            },
            zoom:15,
            boxes:[],
            boxesLength:0,
            selectedBox:{},
            selectedBoxLength:0,
            hideInfoPanel:true,
            updatePositionMarker:true,
            addNewLocation:false,
            newBoxLocationDraggable:true,
            newBoxLocation:{},
            newBoxLocationLength:0,
            newBoxLocationName:'',
            newBoxLocationUserAdded:'',
            newBoxAddress:'',
            confirmNewLocation:false,
            newLocationSubmitted:false
        };
        this.onSearchedAddress = this.onSearchedAddress.bind(this);
        this.onBoxSelect = this.onBoxSelect.bind(this);
        this.onInfoPanelClose = this.onInfoPanelClose.bind(this);
        this.onAddNewLocation = this.onAddNewLocation.bind(this);
        this.getNewBoxLocation = this.getNewBoxLocation.bind(this);
        this.onConfirmNewLocation = this.onConfirmNewLocation.bind(this);
        this.onCancelAddNewLocation = this.onCancelAddNewLocation.bind(this);
        this.onSubmitNewBoxLocation = this.onSubmitNewBoxLocation.bind(this);
        this.onGetNewBoxAddress = this.onGetNewBoxAddress.bind(this);
        this.onUpdateNewBoxName = this.onUpdateNewBoxName.bind(this);
    }
    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = position.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
        const firebaseRef = firebase.database().ref('boxes');
        const boxes = [];
        firebaseRef.on('child_added',(snapshot,key)=>{
            const newLocation = {
                position:snapshot.val().position,
                content:[snapshot.val().fullAddress,snapshot.val().operatingName,
                    snapshot.val().source],
                icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
            };
            boxes.push(newLocation);
            const boxesLength = boxes.length;
            if(boxes.length >= 590){
                this.setState({boxes: boxes,boxesLength:boxesLength});
            }
            // const firebaseRefId = firebase.database().ref('boxes/' +key);
            // const currentItem = snapshot.val();
            // currentItem.source = 'City of Toronto';
            // firebaseRefId.set(currentItem);
        })

    }
    render() {
        return (
            <div>
                <GoogleMap google={this.props.google}
                           zoom = {this.state.zoom}
                           boxes = {this.state.boxes}
                           boxesLength = {this.state.boxesLength}
                           currentLocation={ this.state.currentLocation }
                           onSearchedAddress={this.onSearchedAddress}
                           updatePositionMarker = {this.state.updatePositionMarker}
                           addNewLocation = {this.state.addNewLocation}
                           newBoxLocationDraggable = {this.state.newBoxLocationDraggable}
                           getNewBoxLocation = {(newLocation)=>this.getNewBoxLocation(newLocation)}
                           newBoxLocation = {this.state.newBoxLocation}
                           newBoxLocationLength = {this.state.newBoxLocationLength}
                           onGetNewBoxAddress = {(address)=>this.onGetNewBoxAddress(address)}
                           confirmedNewLocation = {this.state.confirmNewLocation}
                           newLocationSubmitted = {this.state.newLocationSubmitted}>
                    <Marker />
                    <NewLocationMarker/>
                    <Boxes
                        onBoxSelect = {(i)=>this.onBoxSelect(i)}/>
                </GoogleMap>
                <button
                    style={{background:'yellow'}}
                    onClick={()=>this.onAddNewLocation()}>
                    Add Missing Location
                </button>
                <ConfirmNewLocation
                    addNewLocation = {this.state.addNewLocation}
                    onConfirmNewLocation = {this.onConfirmNewLocation}
                    confirm = {this.state.confirmNewLocation}
                    newBoxLocationLength = {this.state.newBoxLocationLength}
                    newLocationSubmitted = {this.state.newLocationSubmitted}
                    onCancelAddNewLocation={this.onCancelAddNewLocation}/>
                <InfoPanel
                    hideInfoPanel = {this.state.hideInfoPanel}
                    selectedBox = {this.state.selectedBox}
                    selectedBoxLength = {this.state.selectedBoxLength}
                    onInfoPanelClose = {()=>this.onInfoPanelClose()}
                    confirmedNewLocation = {this.state.confirmNewLocation}
                    addNewLocation = {this.state.addNewLocation}
                    onCancelAddNewLocation = {()=>this.onCancelAddNewLocation()}
                    onSubmitNewBoxLocation = {()=>this.onSubmitNewBoxLocation()}
                    newLocationSubmitted = {this.state.newLocationSubmitted}
                    newBoxAddress ={this.state.newBoxAddress}
                    onUpdateNewBoxName = {(evt)=>this.onUpdateNewBoxName(evt)}
                />

            </div>
        )
    }
    onSearchedAddress(position){
        const zoom =17;
        this.setState({
            currentLocation:position,
            zoom:zoom,
            updatePositionMarker:true
        });
    }
    onBoxSelect(i) {
        const boxClicked = {
            content: this.state.boxes[i].content,
            position: this.state.boxes[i].position,
        };
        const zoom=17;
        const boxLength = boxClicked.length;
        this.setState({
            selectedBox: boxClicked,
            zoom:zoom,
            currentLocation:boxClicked.position,
            updatePositionMarker:false,
            hideInfoPanel:false,
            selectedBoxLength:boxLength
        });
    }
    onInfoPanelClose(){
        this.setState({hideInfoPanel:true, updatePositionMarker:false})
    }
    onAddNewLocation(){
        if(!this.state.submitNewLocationButtonClicked){
            this.setState({addNewLocation:true,
                updatePositionMarker:false,
                confirmNewLocation:false,
                hideInfoPanel:true,
                newBoxLocationLength:0,
                newBoxLocation:{},
                submitNewLocationButtonClicked:true,
                selectedBoxLength:0,
                newLocationSubmitted:false
            });
        }
        else {
            this.setState({addNewLocation:false,
                updatePositionMarker:false,
                hideInfoPanel:true,
                submitNewLocationButtonClicked:false,
                selectedBoxLength:0
            });
        }
    }
    getNewBoxLocation(newLocation){
        const newBoxLocationLength = newLocation.length;
        this.setState({newBoxLocation:newLocation,
            updatePositionMarker:false,
            newBoxLocationLength:newBoxLocationLength
        });

    }
    onGetNewBoxAddress(address){
        this.setState({newBoxAddress: address});
    }
    onConfirmNewLocation(){
        this.setState({updatePositionMarker:false,
            confirmNewLocation:true,
            hideInfoPanel:false,
            newBoxLocationDraggable:false
        });
    }
    onUpdateNewBoxName(evt){
        this.setState({newBoxLocationName:evt.target.value})
    }
    onCancelAddNewLocation(){
        this.setState({hideInfoPanel:true,
            confirmNewLocation:false,
            addNewLocation:false,
            submitNewLocationButtonClicked:false,
            newLocationSubmitted:false,
            newBoxLocationDraggable:true
        });
    }
    onSubmitNewBoxLocation(){
        const newLocation={
            content:[this.state.newBoxAddress, this.state.newBoxLocationName, 'User Added'],
            icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            position:this.state.newBoxLocation,
        };
        const boxes = this.state.boxes;
        const newBoxesLength = boxes.push(newLocation);
        this.setState({newLocationSubmitted:true,
            updatePositionMarker:false,
            selectedBoxLength:0,
            addNewLocation:false,
            hideInfoPanel:false,
            confirmNewLocation:true,
            newBoxLocationLength:0,
            newBoxLocation:{},
            boxes: boxes,
            boxesLength: newBoxesLength,
            submitNewLocationButtonClicked:false,
            newBoxLocationDraggable:true
        });
    }
}
export default GoogleApiWrapper({
    apiKey:  'AIzaSyDySZz45rznaB9fi5BL3FNpOJ0n_T3mhEo',
    libraries: ['places','visualization']
})(MapContainer)
