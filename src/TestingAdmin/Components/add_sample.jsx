import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import CheckUserNameAndAdd from "./check_username_and_add";
import swal from "sweetalert";

export default class AddSample extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      goToCheck: false,
    };
  }

  goToCheck = () => {
    this.setState({
      goToCheck: true,
    });
  };

  returnToThisPage = () => {
    this.setState({
      goToCheck: false,
    });
  };

  render() {
    if (!this.state.goToCheck) {
      return (
        <div
          style={{
            padding: "2.5em",
          }}
        >
          <Paper
            style={{
              borderBottomColor: "#889d",
              borderTopColor: "#89fa",
              borderBottomWidth: "3em",
              borderTopColor: "#8ffa",
              borderBottomColor: "#2ffa",
              borderTopWidth: "3em",
              display: "flex",
              flexDirection: "column",
              padding: "4em",
              height: "14em",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (this.state.username.length === 0) {
                  swal("Error", "the username field is empty", "error");
                } else if (
                  this.state.username.length <= 7 ||
                  this.state.username.length > 8
                ) {
                  swal(
                    "Error",
                    "usernames can only have seven charachters",
                    "error"
                  );
                } else {
                  this.goToCheck();
                }
              }}
            >
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="start typing the user name here, '@' will be added"
                helperText="all usernames have seven charachters"
                value={this.state.username}
                onChange={(e) => {
                  if (this.state.username.length === 0) {
                    this.setState({
                      username: "@" + e.target.value,
                    });
                  } else {
                    this.setState({
                      username: e.target.value,
                    });
                  }
                }}
                variant="outlined"
                label="@username"
              ></TextField>

              <Button
                fullWidth
                type="submit"
                onClick={() => {
                  if (this.state.username.length === 0) {
                    swal("the username field is empty");
                  } else if (
                    this.state.username.length <= 7 ||
                    this.state.username.length > 8
                  ) {
                    swal("usernames can only have seven charachters");
                  } else {
                    this.goToCheck();
                  }
                }}
                style={{
                  marginTop: "10em",
                  backgroundColor: "#88ff",
                  color: "white",
                }}
              >
                start
              </Button>
            </form>
          </Paper>
        </div>
      );
    } else {
      return (
        <CheckUserNameAndAdd
          username={this.state.username}
          returnToThisPage={this.returnToThisPage}
        />
      );
    }
  }
}
