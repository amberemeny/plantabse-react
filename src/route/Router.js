/* eslint-disable no-unused-vars */
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from "../pages/login"
import PlantsIndexPage from "../pages/plantsIndexPage"
import DashboardPage from "../pages/dashboard"
import PlantViewPage from '../pages/plantsViewPage'

const Router = props => (
  

  <BrowserRouter>
    <Switch>
      {/* Main pages */}
      <Route exact path="/" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/yourplants/:id" component={PlantViewPage} />
      <Route path="/yourplants" component={PlantsIndexPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
