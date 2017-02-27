import React from 'react';
import HamburgerMenu from './hamburger-menu';
import SearchBar from './search-bar';
const FontAwesome = require('react-fontawesome');

class Header extends React.Component{
  render() {
    return <div className="headerContainer">
            <HamburgerMenu />
            <SearchBar />
            <div className="logo">
            	{/*<FontAwesome name='archive' size="1x" />
            	ClôBin*/}
            </div>
    </div>
  }
}

export default Header;