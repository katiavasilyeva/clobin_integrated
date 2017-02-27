import React from 'react';
import { Link } from 'react-router';
var FontAwesome = require('react-fontawesome');

class HamburgerMenu extends React.Component{
    constructor() {
    	super();
    	this.state = {
    		isBurgerOpen: 'closed'
    	};
    	this.burgerClick = this.burgerClick.bind(this);
    }
    burgerClick(){
        if (this.state.isBurgerOpen === 'closed'){
            this.setState({isBurgerOpen: "open"});
        } else {
            this.setState({isBurgerOpen: 'closed'});
        }
    }
	render() {
		//console.log(this.state);
		return ( <div className={"menuContainer " + this.state.isBurgerOpen}>
			<div className="burger" onClick={this.burgerClick}>
				<FontAwesome name='bars' size="3x" />
			</div>

			<ul>
				<li><Link to="/">Map</Link></li>
				<li><Link to="/info">Info</Link></li>
				<li><Link to="/calculator">Calculator</Link></li>
			</ul>
		</div> )
	};
}

export default HamburgerMenu;