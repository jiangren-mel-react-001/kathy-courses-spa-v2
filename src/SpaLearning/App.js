import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, MenuItem,NavItem} from 'react-bootstrap';

import Home from './login_out/home';
import CoursesContainer from './courses/coursesContainer';
import CourseCreate from './courses/courseCreate';
import CourseDetail from './courses/courseDetail';
import CourseEdit from './courses/courseEdit';

import TeachersContainer from './teachers/teachersContainer';

import Login from './login_out/login';

import "./App.css";

export default class SpaLearning extends Component{
    constructor(props){
        super(props);
        this.state={
            token:''
        }
        this.handleTokenChange = this.handleTokenChange.bind(this);
    }

    handleTokenChange(newToken){


        console.log('token changed in app.js', newToken);

        this.setState({token:newToken}, ()=>{

            ReactDOM.findDOMNode(this.signinItem).innerHTML = "Welcome!  "+this.state.token;
            ReactDOM.findDOMNode(this.signinItem).className = "userNameText";
        });

    }

    render(){
        return(
            <div className="appFrame">
                <Router>
                    <div>
                        <Navbar inverse collapseOnSelect>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <Link to="/home">SPA Learning System</Link>
                                </Navbar.Brand>
                                <Navbar.Toggle/>
                            </Navbar.Header>
                            <Nav>
                                <NavItem eventKey={2}  >
                                    <Link to="/courses">Courses</Link>
                                </NavItem>
                                <NavItem eventKey={3} >
                                    <Link to="/teachers">Teachers</Link>
                                </NavItem>
                            </Nav>
                            <Navbar.Collapse>
                                <Nav pullRight>
                                    <NavItem eventKey={4} ref={input=>this.signinItem = input}>
                                        <Link to="/login">Sign In</Link>
                                    </NavItem>
                                    <NavItem eventKey={5} >
                                        <Link to="/logout">Sign Out</Link>
                                    </NavItem>
                                </Nav>
                            </Navbar.Collapse>

                        </Navbar>

                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/courses" exact render={props=><CoursesContainer {...props} />}/>
                            <PrivateRoute path="/course/create" exact renderComponent={CourseCreate} token={this.state.token}/>)}/>
                            <Route path="/course/detail/:id"  render={props =><CourseDetail {...props}/>}/>
                            <Route path="/course/edit/:id"  render={({history,location}) => <CourseEdit history={history} location={location} />}/>
                            <Route path="/login" exact render={props=><Login {...props} onTokenChange={this.handleTokenChange}/>} />

                            <Route path="/teachers" exact render={props=><TeachersContainer {...props}/>}/>
                        </Switch>
                    </div>
                </Router>

            </div>
        )
    }
}

const PrivateRoute=({renderComponent:Component, path:Path, ...rest})=>{

    return (
        <Route path={Path} {...rest} render={(props)=>{
            console.log("...rest is ",rest);
            console.log("props is ",props);
            return(
                rest.token? (<Component {...props}/>) :
                    <Redirect to={{pathname:"/login",
                        state:{from:props.location}}}/>
            )
        }}
        />
    )
}




