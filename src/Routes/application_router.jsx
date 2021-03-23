import React, { Component } from "react";
import Authentication from "../Auth/authentication";
import MainRouter from "./Main/main_route";
import { AppContext } from "../Context/application_context";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <AppContext.Consumer>
    {(context) => {
      return (
        <Route
          {...rest}
          render={(props) =>
            context.auth_level_verify() !== 0 ? (
              <MainRouter />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      );
    }}
  </AppContext.Consumer>
);

export default class application_router extends Component {
  static contextType = AppContext;

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <AuthenticatedRoute path="/service" component={MainRouter} />
          {/* <Route path="*" component={} /> */}
        </Switch>
      </Router>
    );
  }
}
