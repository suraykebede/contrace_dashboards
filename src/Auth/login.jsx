import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextFied from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconProvider from "./Components/icon_provider";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import swal from "sweetalert";
import { AppContext } from "../Context/application_context";
import login_data_verifier from "../Auth/Verifiers/login_data_verifier";

export default class login extends Component {
  constructor() {
    super();
    this.state = {
      selected_value: 3,
      username: "",
      password: "",
    };
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
          <Select
            value={this.state.selected_value}
            onChange={(e) => {
              this.setState({
                selected_value: e.target.value,
              });
            }}
            style={{
              marginLeft: "4em",
              width: "20em",
              marginTop: "4em",
              marginBottom: "4em",
            }}
          >
            <MenuItem value={1}>
              <Typography>System Administrator</Typography>
            </MenuItem>
            <MenuItem value={2}>
              <Typography>Testing Site Administrator</Typography>
            </MenuItem>
            <MenuItem value={3}>
              <Typography>Health Administrator</Typography>
            </MenuItem>
          </Select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let verifier_result = login_data_verifier.login_data_verifier(
                this.state.username,
                this.state.password
              );
              if (verifier_result === "ALL_GOOD") {
                this.context.log_in_init(
                  this.state.username,
                  this.state.password,
                  this.state.selected_value
                );
              } else {
                swal("Unable to log in", verifier_result, "warning");
              }
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#282b",
                marginLeft: "43%",
                height: "3.5em",
                width: "3.5em",
              }}
            >
              <IconProvider icon_value={this.state.selected_value} />
            </Avatar>
            <TextFied
              label="@username"
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              style={{
                marginLeft: "4em",
                width: "20em",
                marginTop: "2em",
              }}
            ></TextFied>
            <TextFied
              label="password"
              type="password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              style={{
                marginLeft: "4em",
                width: "20em",
                marginTop: "2em",
              }}
            ></TextFied>
            <Button
              type="submit"
              fullWidth
              endIcon={<ArrowForwardIosIcon />}
              style={{
                color: "#ff000",
                marginTop: "6em",
                height: "6em",
                backgroundColor: "#ffffff",
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
