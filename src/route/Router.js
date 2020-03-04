/* eslint-disable no-unused-vars */
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from "../pages/login"
import YourPlantsPage from "../pages/yourPlants"
import DashboardPage from "../pages/dashboard"

const Router = props => (
  

  <BrowserRouter>
    <Switch>
      {/* Main pages */}
      <Route exact path="/" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/yourplants" component={YourPlantsPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
