/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';



export class ExpenseSummary extends React.Component {
	constructor(props) {
	super(props);
		this.getTotalBudget = this.getTotalBudget.bind(this);
		this.getTotalSpent = this.getTotalSpent.bind(this);
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
  // 	this.props.dispatch(actions.fetchAllGoals());
  // 	this.props.dispatch(actions.fetchAllTransactions());
  // 	}

	getTotalBudget() {
		let totalBudget = 0;
		for (let i = 0; i < this.props.goals.length; i++) {
			totalBudget += this.props.goals[i].goal;
		}
		return totalBudget
	}

	getTotalSpent() {
		let totalSpent = 0;
		let placeholder = this.props.expenses;
		if (placeholder) {
			for (let i = 0; i < placeholder.length; i++) {
				totalSpent += placeholder[i].cost;
			}
			return totalSpent
		}
	}


    render() {


		let totalExpenses = {}
		let divStyle = {width: '60%'}

		for (let i=0; i<this.props.categories.length; i++) {
			let temp = this.props.categories[i].name;
			totalExpenses[temp] = 0;
			for(let k=0; k<this.props.expenses.length; k++){
				let newTemp = this.props.expenses;
				if (newTemp[k].category === temp) {
					totalExpenses[temp] += newTemp[k].cost;
				}
			}
		}

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name.capitalize()}</option>
			);
		})

		let goals = this.props.goals.map((goal,index)=>{
			let otherTemp = goal.category;
			let percentageVal;
			if (Math.floor((totalExpenses[otherTemp]/goal.goal) * 100) > 100) {
				percentageVal = 100
			} else {
				percentageVal = Math.floor((totalExpenses[otherTemp]/goal.goal) * 100)
			}

		let divStyle = {width: `${percentageVal}%`}
			return (
				<tr key={index}>
					<td className="category-title"><b>{goal.category.capitalize()}</b></td>
					<td className="center">${totalExpenses[otherTemp].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
					<td className="center">${goal.goal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
					<div className="progress">
						<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{percentageVal}" aria-valuemin="0" aria-valuemax="100" style={divStyle}>
							{percentageVal}%
						</div>
					</div>
				</tr>
			);
		})

		let percentageValue;
			if (Math.floor((this.getTotalSpent()/this.getTotalBudget()) * 100) > 100) {
				percentageValue = 100
			} else {
				percentageValue = Math.floor((this.getTotalSpent()/this.getTotalBudget()) * 100)
			}

		let totalDivStyle = {width: `${percentageValue}%`}

		let totals =
			<tr className="summaryTotal">
				<td className="category-title"><b><h5>Total</h5></b></td>
				<td className="center"><b><h5>${this.getTotalSpent().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</h5></b></td>
				<td className="center"><b><h5>${this.getTotalBudget().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</h5></b></td>
				<div className="progress">
					<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{percentageValue}" aria-valuemin="0" aria-valuemax="100" style={totalDivStyle}>
						{percentageValue}%
					</div>
				</div>
			</tr>

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
            </nav>
			<div className="summaryContent">
				<div className="buttons">
					<button className=" glyphicon glyphicon-chevron-left directionalButtons" onClick={() => this.onClickBack()} ></button>
					<button className=" glyphicon glyphicon-chevron-right directionalButtons" onClick={() => this.onClickNext()} ></button>
				</div>

				<div className="page-header makeColoredHeader">
					<h1 className="stepHeaders">Summary of your expenses</h1>
				</div>

				<table className="table">
					<tr>
						<th><h4><u>Category</u></h4></th>
						<th><h4 className="center"><u className="center">Spent</u></h4></th>
						<th><h4 className="center"><u className="center">Budget</u></h4></th>
						<th className="center-percentages"><h4><u>Percent of Budget Used</u></h4></th>
					</tr>
						{goals}
					<tr className="center-no-height">
						<td className="category-title center-no-height">__________</td>
						<td className="center"><b className="center">__________</b></td>
						<td className="center"><b className="center">__________</b></td>
						<td className="center"><b className="center">________________________________________________________________________________</b></td>
					</tr>
						{totals}
				</table>
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

export default connect(mapStateToProps)(ExpenseSummary);
