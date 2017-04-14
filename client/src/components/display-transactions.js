/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import DatePicker from 'react-bootstrap-date-picker';
import store from '../store';
import Chart from 'chart.js'

Chart.defaults.global.responsive = false;

export class DisplayTransactions extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
		this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
		this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
		this.handleChange = this.handleChange.bind(this);
    	this.onClickBack = this.onClickBack.bind(this);
    	this.onClickNext = this.onClickNext.bind(this);
	    this.updateUserInDatabase = this.updateUserInDatabase.bind(this);
    }

    updateUserInDatabase() {
        this.props.dispatch(actions.updateUserInDatabase(this.props))
    }

	onClickBack() {
		console.log('PREV');
		if (this.props.renderPage > 1) {
			this.props.dispatch(actions.decrementRenderView())
		}
	}

	onClickNext() {
		console.log('NEXT')
		if (this.props.renderPage < 7) {
		this.props.dispatch(actions.incrementRenderView())
		}
	}

	// componentDidMount() {
	// 	this.props.dispatch(actions.fetchCalendar());
	// 	this.props.dispatch(actions.fetchAllTransactions());
	// }

  	handleChangeStartDate(value, formattedValue) {
		this.props.dispatch(actions.displayTransactionStartDate(formattedValue));
 	}

  	handleChangeEndDate(value, formattedValue) {
		this.props.dispatch(actions.displayTransactionEndDate(formattedValue));
 	}


	onClick(expenseId) {
		this.props.dispatch(actions.deleteExpense(expenseId));
		this.props.dispatch(actions.fetchAllTransactions());
	}

	handleChange() {
		let tempCategory = (this.refs.expenseCategory).value;
		this.props.dispatch(actions.fetchAllTransactions());
		this.props.dispatch(actions.changeCurrentCategory(tempCategory));
	}


	render() {

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		});

		let transactionsBlurb;
		if (this.props.displayTransactions.startDate || this.props.displayTransactions.endDate) {
			transactionsBlurb = <h3 className="transaction-span" >Showing <span className="greenie" >{this.props.currentCategory}</span> transactions between <span className="greenie" >{this.props.displayTransactions.startDate}</span> and <span className="greenie" >{this.props.displayTransactions.endDate}</span> </h3>
		}

		let listOfTransactions;
		if (this.props.expenses) {
			if (this.props.currentCategory === "All") {
				listOfTransactions = this.props.expenses.map((transaction, index) => {
				for (let i = this.props.calendar.indexOf(this.props.displayTransactions.startDate); i <= this.props.calendar.indexOf(this.props.displayTransactions.endDate); i++) {
					if (this.props.calendar[i] === transaction.date) {
						return (
							<tr key={index}><td className="left">{transaction.date}</td><td className="left">{transaction.category.capitalize()}</td><td className="left">${transaction.cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td> <td
							className="left">{transaction.description}</td><td className="alignRemoveMarker" ><button className="glyphicon glyphicon-remove left" onClick={() => this.onClick(transaction.id)} value={transaction.id} type="submit"></button></td></tr>
				)
				}}})
			} else {
				listOfTransactions = this.props.expenses.filter(transaction => {
					return (
						transaction.category == this.props.currentCategory)}).map((transaction, index) => {
							for (let i = this.props.calendar.indexOf(this.props.displayTransactions.startDate); i < this.props.calendar.indexOf(this.props.displayTransactions.endDate); i++) {
							if (this.props.calendar[i] === transaction.date) {
								return (
									<tr key={index}><td><bold>{transaction.date}</bold></td><td><bold>{transaction.category.capitalize()}</bold></td><td><bold>${transaction.cost}</bold></td><td><bold>{transaction.description}</bold></td><td><button className="glyphicon glyphicon-remove" onClick={() => this.onClick(transaction.id)} value={transaction.id} type="button"></button></td></tr>
								)
			}}})}}


	return (
		<div>
            <nav id="mainNav" className="navbar navbar-default navbar-fixed-top navbar-custom">
                <div className="container">

                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand" href="#page-top">Easy Budget</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden">
                                <a href="#page-top"></a>
                            </li>
                            <li className="page-scroll">
                                <a href="#portfolio">Advice</a>
                            </li>
                            <li className="page-scroll">
                                <a href="#about">Resources</a>
                            </li>
                            <li className="page-scroll">
                                 <a onClick={this.updateUserInDatabase} href="/api/auth/logout">Sign Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="green-bar">
                </div>
            </nav>
			<div className="container">
				<div className="summaryContent">
					<div className="buttons">
						<button className=" glyphicon glyphicon-chevron-left directionalButtons" onClick={() => this.onClickBack()} ></button>
						<button className=" glyphicon glyphicon-chevron-right directionalButtons" onClick={() => this.onClickNext()} ></button>
					</div>
					<div className="page-header makeColoredHeader">
						<h1 className="stepHeaders">View and Edit Your Expense History</h1>
					</div>
					<br></br>
					<form >
						<label>Choose a category,</label>
						<select name="expenseCategory" id='expenseCategory' className="form-control center-dropdown" value={this.value} ref="expenseCategory" onChange={this.handleChange} required>
							<option value="All">All</option>
							{options}
						</select>
						<br></br>
						<label className='' >a start date,</label>
						<DatePicker  className='calendarToggle' id="example-datepicker-start"   ref="datePicked" onChange={this.handleChangeStartDate}   placeholderText={this.props.displayTransactions.startDate} />
						<br></br>
						<label className='' >and an end date</label>
						<DatePicker  className='calendarToggle' id="example-datepicker-end"   ref="datePicked" onChange={this.handleChangeEndDate}   placeholderText={this.props.displayTransactions.endDate}/>
						<br></br>
					</form>
					{transactionsBlurb}
					<br></br>
					<br></br>
					<div>
					<table className="table transactions-table">
						<thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Description</th><th>Remove</th></tr></thead>
						<tbody>
							{listOfTransactions}
						</tbody>
					</table>
					</div>
				</div>
			</div>
		</div>
		)
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


export default connect(mapStateToProps)(DisplayTransactions);
