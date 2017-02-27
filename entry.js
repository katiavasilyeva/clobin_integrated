import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './components/app-layout';
import MapPage from './components/map-page';
import InfoPage from './components/info-page';
import CalcPage from './components/calc-page';
import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBZam93AT_8zj8yCrTlGFAZm4ORD0PIVYU",
    authDomain: "clobin-91825.firebaseapp.com",
    databaseURL: "https://clobin-91825.firebaseio.com",
    storageBucket: "clobin-91825.appspot.com",
    messagingSenderId: "288918706586"
};
require("file-loader?name=[name].[ext]!./index.html");
firebase.initializeApp(config);
require("!style-loader!css-loader!less-loader!./css/style.less");

ReactDOM.render(
	<Router history={ browserHistory } >
		<Route path="/" component={AppLayout} >
			<IndexRoute component={ MapPage } />
			<Route path="info" component={InfoPage} />
			<Route path="calculator" component={CalcPage} />
		</Route>
	</Router>

	,document.getElementById('placeholder')
);
