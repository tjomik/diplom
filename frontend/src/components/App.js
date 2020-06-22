import React, {useEffect, useState} from 'react';
import './App.css';
import Authorization from "./Authorization";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Registration from "./Registration";
import Error from "./Error";
import {connect} from "react-redux";
import {checkAuthorization} from "../globals/auth";
import Main from "./Main";
import Loading from "./Loading";
import Catalog from "./Catalog";
import CarModel from "./CarModel";
import NavBar from "./NavBar";
import UsersRatings from "./UsersRatings";
import About from "./About";
import AccountSettings from "./AccountSettings";

function App(props) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuthorization();
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, []);

    return (
        <div className='container'>
            {isLoading ? <Loading/> :
                props.isAuthorized ?
                    <>
                    <Router>
                        <NavBar/>
                        <Switch>
                            <Route path='/catalog/:id' component={(props) => <CarModel {...props} key={window.location.pathname}/>}/>
                            <Route path='/catalog' component={Catalog}/>
                            <Route path='/users_ratings' component={UsersRatings}/>
                            <Route path='/account_settings' component={AccountSettings}/>
                            <Route path='/about' component={About}/>
                            <Redirect to='/catalog' component={Main}/>
                        </Switch>
                    </Router>
                    </>
                    :
                    <Router>
                        <Switch>
                            <Route path='/registration' component={Registration}/>
                            <Route path='/authorization' component={Authorization}/>
                            <Redirect to='/authorization'/>
                        </Switch>
                    </Router>
            }
            <Error/>
        </div>
    );
    }

const mapStateToProps = state => {
    return {
        isAuthorized: state.isAuthorized
    };
};

export default connect(mapStateToProps)(App);
