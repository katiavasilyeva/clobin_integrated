import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends Component{
    constructor(){
        super();
        this.state = {position:{
            lat:null,
            lng:null
        }}
    }

    onSubmit(e) {
        e.preventDefault();}

    componentDidMount() {
        this.renderAutoComplete();
    }
    componentDidUpdate(prevProps) {
        const map = this.props.map;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    }
    renderAutoComplete() {
        let map = this.props.map;
        let google = this.props.google;
        if (!google || !map) return;

        const aref = this.refs.autocomplete;
        const node = ReactDOM.findDOMNode(aref);
        const autocomplete = new google.maps.places.Autocomplete(node);
        autocomplete.addListener('place_changed', () => {

            const place = autocomplete.getPlace();

            if (!place.geometry) {
                return (null);

            }

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            const position = {lat:lat,lng:lng};
            this.setState({position:position});
            this.props.onSearchedAddress(this.state.position)
        })
    }
    render(){
        return(
			<div >
				<form
					onSubmit={this.onSubmit}>
					<input
						className="search-bar"
						ref='autocomplete'
						type="text"
						placeholder="Search for bin nearby..."
					/>
				</form>
			</div>
        )
    }
}
export default SearchBar