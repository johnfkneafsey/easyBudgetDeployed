/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';


export class CategoryGoals extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {};
    	this.onSubmit = this.onSubmit.bind(this);
    	this.completeStatus = this.completeStatus.bind(this);
		this.getBudget = this.getBudget.bind(this);
		this.getTotalBudget = this.getTotalBudget.bind(this);
    	this.onClickBack = this.onClickBack.bind(this);
    	this.onClickNext = this.onClickNext.bind(this);
	    this.updateUserInDatabase = this.updateUserInDatabase.bind(this);
    }

    updateUserInDatabase() {
		console.log('props herer',this.props);
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

	onSubmit(event) {
  		event.preventDefault();
  		let categoryAmount = parseInt((this.refs.dollars).value.trim());
        let goalCategory = (this.refs.expenseCategory).value.trim();
		let goalIndex = -1;
		if (categoryAmount / categoryAmount !== 1) {
			alert("Please enter a valid number")
			return null;
		}
		for (let i = 0; i < this.props.goals.length; i++) {
			if ((this.props.goals[i].category) === goalCategory) {
				goalIndex = i;
			}
  		}
		if (goalIndex === -1) {
			this.props.dispatch(actions.addCategoryGoal(goalCategory,categoryAmount));
		}
		this.refs.dollars.value = "";
	};

	completeStatus(goalCategory) {
		for (let i = 0; i < this.props.goals.length; i++) {
			if (goalCategory === this.props.goals[i].category) {
				return 'glyphicon glyphicon-ok';
			}
		}
			return 'glyphicon glyphicon-option-horizontal';
	}

	getBudget(categoryName) {
		for (let i = 0; i < this.props.goals.length; i++) {
			if (this.props.goals[i].category === categoryName) {
				return this.props.goals[i].goal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			}
		}
	}

	getTotalBudget() {
		let totalBudget = 0;
		for (let i = 0; i < this.props.goals.length; i++) {
			totalBudget += this.props.goals[i].goal;
		}
		return totalBudget.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	render() {

		let categories = this.props.categories.map((category,index)=>{
			return (
				<div key={index} className="shrink-div">
					<p key={index+10} className='budgets'>{category.name.capitalize()}  :  ${this.getBudget(category.name)}</p>
					<span key={index+50} className={this.completeStatus(category.name) + ' centerMarks'} aria-hidden="true"></span>
				</div>
			);
		})

		let totalBudget =
			<b><p className='budgets'>Total  :  ${this.getTotalBudget()}</p></b>

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name} className="center-dropdown">{category.name.capitalize()}</option>
			);
		})

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		return (
			<div className="container" >
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
									<a href="#Top"></a>
								</li>
								<li className="page-scroll">
									<a href="#Advice">Advice</a>
								</li>
								<li className="page-scroll">
									<a href="#Resources">Resources</a>
								</li>
								<li className="page-scroll">
									 <a onClick={this.updateUserInDatabase} href="/api/auth/logout">Sign Out</a>
								</li>
							</ul>
						</div>

						<div className="green-bar">
						</div>
					</div>

				</nav>

					<div className="categoriesContent">
						<div className="buttons">
							<button className=" glyphicon glyphicon-chevron-left directionalButtons" onClick={() => this.onClickBack()} ></button>
							<button className=" glyphicon glyphicon-chevron-right directionalButtons" onClick={() => this.onClickNext()} ></button>
						</div>

					<div className="page-header makeColoredHeader">
						<h1 className="stepHeaders">Step 2:</h1>
						<h3 className="steps">Define budgets by category</h3>
					</div>

					<div>
						<form onSubmit={this.onSubmit} >
							<label>Select a category</label>
								<select className="form-control center-dropdown" name="expenseCategory" id='expenseCategory' ref="expenseCategory" required>
									{options}
								</select>
							<br></br>
							<label>Set a budget</label>
								<input type="text" className="form-control" placeholder="Enter dollar amount" ref="dollars" required />
							<br></br>
								<input type="submit" className="btn btn-primary"/>
						</form>
					</div>

					<div >
						<ul>
							<div className="budgets3">
								{categories}
							</div>
							<div className="budgets2">
								{totalBudget}
							</div>
						</ul>
					</div>
				</div>

			</div>

		)}
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

export default connect(mapStateToProps)(CategoryGoals);
