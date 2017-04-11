/* eslint-disable */
import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import DisplayTransactions from './display-transactions';
import ExpenseSummary from './expense-summary';
import ExpenseChart from './expense-chart';
import DailyExpensesChart from './daily-expenses-chart';
import Landing from './landing';
import Title from './title';
import LoginPage from './login-page';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

import * as Cookies from 'js-cookie';



export class Layout extends React.Component {
	constructor(props) {
    	super(props);
    }

	render() {

		if (this.props.renderPage === 0) {
			console.log('were here at render 0')
			return (
			<div>
				< Title />
				< Landing  />
			</div>
			)
		}
		if (this.props.renderPage === 1) {
			return (
			< ExpenseCategoryList  />
			)
		}
		if (this.props.renderPage === 2) {
			return (
			< CategoryGoals />
			)
		}
		if (this.props.renderPage === 3) {
			return (
			< ExpenseInput />
			)
		}
		if (this.props.renderPage === 4) {
			return (
			< ExpenseSummary />
			)
		}
		if (this.props.renderPage === 5) {
			return (
			< DisplayTransactions />
			)
		}
		if (this.props.renderPage === 6) {
			return (
			< ExpenseChart />
			)
		}
		if (this.props.renderPage === 7) {
			return (
			< DailyExpensesChart />
			)
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

export default connect(mapStateToProps)(Layout);
