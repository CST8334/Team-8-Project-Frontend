// app.test.js
import { createMemoryHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { Router } from "react-router";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import Login from "layouts/Login.jsx";
import Register from "layouts/Register.js";
test("redirects to login page", () => {
  const history = createMemoryHistory();

  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>;

  expect(history.location.pathname).toBe("/");
});
