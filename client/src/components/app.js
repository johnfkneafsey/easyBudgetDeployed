/* eslint-disable */
import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import store from '../store';
import Layout from './layout';
import LoginPage from './login-page';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch(`/api/me`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status !== 401) {
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }


    render() {
         if (!this.state.currentUser) {
             console.log('WE ARE RENDERING LOGIN?')
            return <LoginPage />;
         } else {
             console.log('WE ARE RENDERING LAYOUT?')
             return <Layout />;
         }
     }
}

const mapStateToProps = (state, props) => ({
	_id: state._id,
	googleId: state.googleId,
	accessToken: state.accessToken,
	name: state.name,
	expenses: state.expenses,
	goals: state.goals,
	categories: state.categories,
	categoryTotals: state.categoryTotals,
	currentCategory: state.currentCategory,
	calendar: state.calendar,
	displayTransactions: state.displayTransactions,
	renderPage: state.renderPage
});

export default connect(mapStateToProps)(App)
