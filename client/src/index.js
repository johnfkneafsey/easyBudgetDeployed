require('babel-polyfill');

console.log(`Client running in ${process.env.NODE_ENV} mode`);

import React from 'react';
import ReactDOM from 'react-dom';
//import Layout from './js/components/layout';

import App from './components/app';
import './index.css';
import store from './store';
import {Provider} from 'react-redux';



console.log('bottom')
document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
    	<Provider store={store} >
    		<App />
    	</Provider>, document.getElementById('app'))
);
