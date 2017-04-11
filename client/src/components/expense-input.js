/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import DatePicker from 'react-bootstrap-date-picker';
import Store from '../store';


export class ExpenseInput extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.componentDidUpdate = this.componentDidUpdate.bind(this);
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


  	handleChange(value, formattedValue) {
    	console.log({
    	  value: value,
     	  formattedValue: formattedValue
    	});
 	}

    componentDidUpdate() {
    var hiddenInputElement = document.getElementById("example-datepicker");
	}

  	onSubmit(event) {
  		event.preventDefault();
  		let expenseDollars = parseInt((this.refs.dollars).value.trim());
        let expenseCategory = (this.refs.expenseCategory).value.trim();
        let expenseDescription = (this.refs.description).value.trim();
        let dateSelected = document.getElementById("example-datepicker").getAttribute('data-formattedvalue');
		if (expenseDollars / expenseDollars !== 1) {
			alert("Please enter a valid number")
			return null;
		}
		this.props.dispatch(actions.addExpense(expenseDollars, expenseCategory, expenseDescription, dateSelected));
	    this.refs.dollars.value = "";
	    this.refs.expenseCategory.value = "";
	    this.refs.description.value = "";
		this.props.dispatch(actions.fetchAllTransactions());
	}

  	render() {

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category,index)=>{
			return (
				<option key={index} value={category.name} className="center-input-text">{category.name.capitalize()}</option>
			);
		})

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
				<div className="categoriesContent">
					<div className="buttons">
						<button className=" glyphicon glyphicon-chevron-left directionalButtons" onClick={() => this.onClickBack()} ></button>
						<button className=" glyphicon glyphicon-chevron-right directionalButtons" onClick={() => this.onClickNext()} ></button>
					</div>
					<div className="page-header makeColoredHeader">
						<h1 className="stepHeaders">Step 3:</h1>
						<h3 className="steps">Input your expenses</h3>
					</div>
					<div>
						<form onSubmit={this.onSubmit}>
							<label className="datePicker">When did it occur?</label>
							<br></br>
							<DatePicker  id="example-datepicker" ref="datePicked" className="datePicker" onChange={this.handleChange} />
							<br></br>
							<label> What did it cost? </label>
							<br></br>
							<input type="text" className="form-control" ref="dollars" placeholder="Enter dollar amount" required/>
							<br></br>
							<label className="category" >How would you categorize it?</label>
							<br></br>
							<select name="expenseCategory" id='expenseCategory' className="form-control center-dropdown" value={this.value} ref="expenseCategory" required>
									{options}
							</select>
							<br></br>
						<label>Provide a description</label>
							<br></br>
						<input type="text" className="form-control" ref="description" placeholder="Enter a description" required/>
							<br></br>
							<input type="submit" className="btn btn-primary"/>
						</form>
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

export default connect(mapStateToProps)(ExpenseInput);
