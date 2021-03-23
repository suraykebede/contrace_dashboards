import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import CircularProgess from "@material-ui/core/CircularProgress";
import { AppContext } from "../../Context/application_context";
import API_ENDPOINT from "../../Connectivity/api_endpoint";
import swal from "sweetalert";

export default class login_verification extends Component {
  constructor() {
    super();
    this.state = {
      login_attempted: false,
    };
  }

  async componentDidMount() {
    let servicevariant = "";
    let test_auth_level = this.context.test_auth_level;
    if (test_auth_level === 1) {
      servicevariant = "me";
    } else if (test_auth_level === 2) {
      servicevariant = "testingsiteadmin";
    } else {
      servicevariant = "healthadmin";
    }
    let query = `/auth/${servicevariant}?username=${this.context.username}&password=${this.context.password}`;
    const response = await API_ENDPOINT.get(query);
    let msg = response.data.msg;
    if (msg === "AUTHORIZED") {
      swal("All good", "click ok to continue", "success").then((value) => {
        this.context.login();
      });
    } else if (msg === "ERROR") {
      swal("Service unavailable", "click ok to try again", "error").then(
        (value) => {
          this.context.retry_login();
        }
      );
    } else {
      if (msg === "PASSWORD_MISMATCH") {
        swal("Invalid password", "click ok to try again", "warning").then(
          (value) => {
            this.context.retry_login();
          }
        );
      } else {
        swal(
          "You have not been granted access",
          "check your user name and check again",
          "error"
        ).then((value) => {
          this.context.retry_login();
        });
      }
    }
  }

  static contextType = AppContext;

  render() {
    return (
      <div
        style={{
          backgroundColor: "#282c36",
          minHeight: "100vh",
          paddingTop: "2em",
        }}
      >
        <Paper
          style={{
            height: "35em",
            width: "33%",
            marginLeft: "33%",
            backgroundColor: "#fafa",
          }}
          elevation={3}
        >
          <CircularProgess
            style={{
              width: "4em",
              height: "4em",
              color: "#282c36",
              marginTop: "15em",
              marginLeft: "12em",
            }}
          />
        </Paper>
      </div>
    );
  }
}
