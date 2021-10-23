import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import Register from '../src/components/Register/Register';
import Home from '../src/components/Home/Home';
import Search from '../src/components/Search/Search';
import { UserProvider } from './context/UserContext';

//classes
import classes from './App.css';

function App() {
    return (
        <UserProvider>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/search">
                    <Search />
                </Route>
            </Switch>
        </UserProvider>
    );
}

export default App;
