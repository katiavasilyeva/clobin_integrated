import React,{Component} from 'react';

class ConfirmNewLocation extends Component{
    render(){
        if(this.props.addNewLocation && this.props.newBoxLocationLength !==0 && !this.props.newLocationSubmitted){
            if(!this.props.confirm){
                return(
                    <div><button onClick={this.props.onConfirmNewLocation}>
                        Confirm Box Location
                    </button>
                        <button onClick={()=>this.props.onCancelAddNewLocation()}>
                            Cancel
                        </button>
                    </div>
                )
            }else{
                return(
                    <div><button onClick={this.props.onConfirmNewLocation}>
                        Confirm Box Location
                    </button>
                    </div>

                )
            }

        }
        else{
            return null;
        }
    }
}

export default ConfirmNewLocation