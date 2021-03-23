import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DoneIcon from "@material-ui/icons/Done";
import API_ENDPOINT from "../../Connectivity/api_endpoint";
import swal from "sweetalert";

export default class add_admins extends Component {
  constructor() {
    super();
    this.state = {
      auth_to_grant: "health",
      username: "",
      accessing_auth: false,
    };
  }

  handle_change = (e) => {
    this.setState({
      auth_to_grant: e.target.value,
    });
  };

  render() {
    return (
      <Paper
        style={{
          height: "30em",
          width: "25em",
          display: "flex",
          flexDirection: "column",
          position: 'fixed'
        }}
      >
        <Typography
          style={{
            marginTop: "1em",
          }}
          variant="h6"
          align="center"
        >
          Add new administrators
        </Typography>
        <div
          style={{
            marginTop: "2em",
            marginBottom: "3em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar
            style={{
              width: "4em",
              height: "4em",
              backgroundColor: "#282c36",
            }}
          >
            <Person
              style={{
                color: "#aa79a0",
                width: "3em",
                height: "3em",
              }}
            />
          </Avatar>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (this.state.username === "") {
              swal(
                "Unable to grant access",
                "Username field is empty",
                "warning"
              );
            } else {
              if (this.state.username.length !== 8) {
                swal(
                  "Unable to grant access",
                  "Username is invalid",
                  "warning"
                );
              } else {
                swal(
                  `Looking for user ${this.state.username}`,
                  "Please Wait",
                  "info"
                );
                const username_req = await API_ENDPOINT.get(
                  `/verifyuser?username=${this.state.username}`
                );
                let username_availablity = username_req.data.msg;
                if (username_availablity === "EXISTS") {
                  const fullname_req = await API_ENDPOINT.get(
                    `/getfullname?username=${this.state.username}`
                  );
                  console.log(fullname_req);
                  let fullname =
                    fullname_req.data.msg.first_name +
                    " " +
                    fullname_req.data.msg.last_name;
                  console.log(fullname);
                  swal({
                    title: "Grant Access?",
                    icon: "info",
                    text: `${this.state.auth_to_grant} administraive rights are about to be granted to ${fullname}`,
                    buttons: true,
                    dangerMode: true,
                  }).then(async (choice) => {
                    if (choice) {
                      if (this.state.auth_to_grant === "health") {
                        const auth_granting = await API_ENDPOINT.post(
                          `/grantprivledge/healthadmin`,
                          {
                            username: this.state.username,
                          }
                        );
                        swal(auth_granting.data.msg);
                      } else {
                        const auth_granting = await API_ENDPOINT.post(
                          `/grantprivledge/testingadmin`,
                          {
                            username: this.state.username,
                          }
                        );
                        swal(auth_granting.data.msg);
                      }
                    }
                  });
                } else {
                  swal(
                    "User not found",
                    "Please check if you have typed the correct username",
                    "error"
                  );
                }
              }
            }
          }}
        >
          <TextField
            fullWidth
            placeholder="@username, '@ will be automatically prefixed'"
            variant="outlined"
            label="username"
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
          ></TextField>
          <RadioGroup
            style={{
              marginTop: "2,5em",
              display: "flex",
              marginLeft: "6em",
            }}
            aria-label="auth_to_grant"
            name="auth_to_grant"
            value={this.state.auth_to_grant}
            onChange={(e) => {
              this.setState({ auth_to_grant: e.target.value });
            }}
          >
            <FormControlLabel
              value="health"
              control={<Radio />}
              label="Health Administrator"
            />
            <FormControlLabel
              value="testing"
              control={<Radio />}
              label="Testing Site Administrator"
            />
          </RadioGroup>
          <Button
            type="submit"
            startIcon={<DoneIcon />}
            style={{
              marginTop: "3em",
              height: "4.5em",
              color: "white",
              fontSize: "1em",
              backgroundColor: "#282c36",
            }}
            fullWidth
          >
            Grant Access
          </Button>
        </form>
      </Paper>
    );
  }
}
