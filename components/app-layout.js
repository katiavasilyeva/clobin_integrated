import React from 'react';
import Header from './header';

class AppLayout extends React.Component{
	render() {
		return ( <div className="appContainer">
			<Header />
			{ this.props.children }
		</div> )
	};
}

export default AppLayout;