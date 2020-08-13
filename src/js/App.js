import React, {Component} from 'react';
import '../css/App.css';
import Weather from './components/Weather/Weather'


require('dotenv').config();

function App() {
	return (
		<div className = 'App'>
			<Weather/>
		</div>
	);
}

export default App;

