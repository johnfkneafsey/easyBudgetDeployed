/* eslint-disable */
import React from 'react';
import bigelephant from '../assets/img/bigelephant.png'


export default function LoginPage() {
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
                        </ul>
                    </div>

                </div>

                <div className="green-bar">
                </div>

            </nav>

            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <img className="img-responsive" src={bigelephant} alt="cartoon elephant" />
                            <div className="intro-text spaceIt">
                                <span className="name">Easy Budget</span>
                                <hr className="star-light"></hr>
                                <span className="skills">Expense Tracking - Budgeting - Simplicity</span>
                            </div>
                            <div>
                                <a className="btn-primary btn" href={`api/auth/google`}>Sign Up or Log In</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </div>


    )}
