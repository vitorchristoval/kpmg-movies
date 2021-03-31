import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Index'
import Details from './pages/Details/Index'






const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/details/:_id' component={Details} />
    </Switch >
  </BrowserRouter>
);



export default Routes;
