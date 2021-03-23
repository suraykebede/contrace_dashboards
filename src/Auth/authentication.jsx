import React, { Component } from "react";
import { AppContext } from "../Context/application_context";
import Login from "./login";
import LoginVerification from "./Components/login_verification";
import AuthConfirmed from "./auth_confirmed";

export default class authentication extends Component {
  static contextType = AppContext;
  render() {
    console.log(this.context);
    const {
      is_attempting_login,
      is_logged_in,
      username,
      password,
      auth_level,
    } = this.context;
    if (!is_logged_in) {
      if (is_attempting_login) {
        return (
          <div>
            <LoginVerification />
          </div>
        );
      } else {
        return (
          <div>
            <Login />
          </div>
        );
      }
    } else {
      return (
        <div>
          <AuthConfirmed />
        </div>
      );
    }
  }
}
