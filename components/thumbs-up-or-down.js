import React from 'react';
var FontAwesome = require('react-fontawesome');

class ThumbsUpOrDown extends React.Component{
	render() {
		return ( 	<div className="ThumbsUpOrDown">
						<div><FontAwesome name='thumbs-up' size="1x" /> 22</div>
						<div><FontAwesome name='thumbs-down' size="1x" /> 3</div>
					</div>
		)
	};
}

export default ThumbsUpOrDown;