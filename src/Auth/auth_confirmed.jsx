import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import AuthUserImage from "./Components/auth_user_image";
import { AppContext } from "../Context/application_context";

export default class auth_confirmed extends Component {
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
            height: "20em",
            width: "33%",
            marginLeft: "33%",
            backgroundColor: "#fafa",
            paddingTop: "8em",
          }}
          elevation={3}
        >
          <div
            style={{
              marginTop: "2em",
              marginLeft: "11em",
            }}
          >
            <AuthUserImage username={this.context.auth_username_verify()} />
          </div>
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/service"
          >
            <Button
              fullWidth
              endIcon={<ArrowForwardIosIcon />}
              style={{
                height: "4em",
                color: "#282c36",
                marginTop: "2em",
              }}
            >
              {" "}
              Continue{" "}
            </Button>
          </Link>
        </Paper>
      </div>
    );
  }
}
