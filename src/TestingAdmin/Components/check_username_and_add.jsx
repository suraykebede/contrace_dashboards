import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import RegisterSample from "./register_sample";
import API_ENDPOINT from "../../Connectivity/api_endpoint";

export default class check_username_and_add extends Component {
  constructor(props) {
    super(props);
    this.username_exists = false;
    this.state = {
      checking: true,
    };
  }

  async componentDidMount() {
    const username_req = await API_ENDPOINT.get(
      `/verifyuser?username=${this.props.username}`
    );
    let username_availablity = username_req.data.msg;
    console.log(username_availablity);
    if (username_availablity === "EXISTS") {
      this.username_exists = true;
      this.setState({
        checking: false,
      });
    } else {
      console.log(username_availablity);
      this.username_exists = false;
      this.setState({
        checking: false,
      });
    }
  }

  render() {
    if (this.state.checking) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "5em",
          }}
        >
          <Typography>{this.props.username}</Typography>
          <div
            style={{
              paddingTop: "3em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <ReactLoading type="spin" width="4em" color="#88ff" /> */}
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      if (!this.username_exists) {
        swal(
          this.props.username + " does not exist",
          "try to be sure you have typed the right username",
          "error"
        );
        return <Button onClick={this.props.returnToThisPage()}>return</Button>;
      } else {
        return <RegisterSample username={this.props.username} />;
      }
    }
  }
}
