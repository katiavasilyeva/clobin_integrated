import React, {Component} from 'react';
import ThumbsUpOrDown from './thumbs-up-or-down'
class InfoPanel extends Component {
    render() {
        if (this.props.confirmedNewLocation && this.props.addNewLocation && !this.props.hideInfoPanel) {
            if(this.props.newLocationSubmitted){
                return(
					<div className="slideUpContainer">
						Location successfully submitted!
						<button onClick={this.props.onInfoPanelClose}>
							X
						</button>
					</div>
                )} else{
                return (
					<div className="slideUpContainer">
						<div>{this.props.newBoxAddress}</div>
						<div>
							<input
								type="text"
								placeholder="Drop Box Name or Operator"
								onChange={(evt)=>this.props.onUpdateNewBoxName(evt)}/>
						</div>
						<button onClick={()=>this.props.onSubmitNewBoxLocation()}>
							SUBMIT
						</button>
						<button
							onClick={()=>this.props.onCancelAddNewLocation()}>
							CANCEL
						</button>
					</div>)}
        }
        else if (this.props.selectedBoxLength !== 0 && !this.props.hideInfoPanel && !this.props.addNewLocation){
            const address = this.props.selectedBox.content[0];
            const operator = this.props.selectedBox.content[1];
            const source = this.props.selectedBox.content[2];
            return (
				<div className="slideUpContainer">
                    <ThumbsUpOrDown />
					<div>Address: {address}</div>
					<div>Name: {operator}</div>
					<div>Source: {source}</div>
					<button>
						Navigate
					</button>
					<button
						onClick={this.props.onInfoPanelClose}>
						X
					</button>
				</div>
            )
        }
        else{
            return null;
        }

    }}

export default InfoPanel
