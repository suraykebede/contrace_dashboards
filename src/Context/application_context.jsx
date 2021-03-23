import React, { Component, createContext } from "react";

export const AppContext = createContext();

export default class application_context_provider extends Component {
  state = {
    is_logged_in: false,
    is_attempting_login: false,
    username: "",
    password: "",
    auth_level: 0,
    test_auth_level: 0,
  };

  auth_level_verify = () => {
    let auth_obj_from_session = sessionStorage.getItem("auth_object");
    let auth_obj = JSON.parse(auth_obj_from_session);
    if (auth_obj) {
      return auth_obj.auth_level;
    } else return 0;
  };

  auth_username_verify = () => {
    let auth_obj_from_session = sessionStorage.getItem("auth_object");
    let auth_obj = JSON.parse(auth_obj_from_session);
    if (auth_obj) {
      return auth_obj.username;
    } else return "NON";
  };

  retry_login = () => {
    this.setState({ is_attempting_login: false });
  };

  login = () => {
    let auth_level = this.state.test_auth_level;
    let auth_object = {
      auth_level: auth_level,
      username: this.state.username,
    };
    let auth_object_string = JSON.stringify(auth_object);
    sessionStorage.setItem("auth_object", auth_object_string);
    this.setState({ auth_level: auth_level, is_logged_in: true });
  };

  log_in_init = (username, password, auth_level) => {
    this.setState({
      username: username,
      password: password,
      test_auth_level: auth_level,
      is_attempting_login: true,
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          log_in_init: this.log_in_init,
          login: this.login,
          retry_login: this.retry_login,
          auth_level_verify: this.auth_level_verify,
          auth_username_verify: this.auth_username_verify,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
