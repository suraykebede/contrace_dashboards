import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
import API_ENDPOINT from "../../Connectivity/api_endpoint";
import Administrator from "./administrator";

export default class testing_site_admins extends Component {
  constructor() {
    super();
    this.admins = [];
    this.admins_components = [];
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const admins_frm_db = await API_ENDPOINT.get("/admins?type=testing");
    //console.log(admins_frm_db.data);
    this.admins = admins_frm_db.data;
    this.setState({
      loading: false,
    });
  }

  administrators() {
    //console.log('admins length', this.admins.length);
    let length = this.admins.length;
    for (let index = 0; index < length; index++) {
      console.log(index, length);
      if (index === length) {
        break;
      }
      this.admins_components.push(
        <Administrator username={this.admins[index]} access={'testing'} />
      );
    }
    return this.admins_components;
  }

  render() {
    if (!this.state.loading) {
      return (
        <Paper
          elevation={3}
          style={{
           // height: "20em",
            backgroundColor: "white",
            paddingTop: "2em",
            // paddingLeft: "13em",
          }}
        >
          <Typography
            style={{
              marginBottom: "2em",
            }}
            align="center"
          >
            {" "}
            Testing site administrators{" "}
          </Typography>
          <Button
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Refresh
          </Button>
          {this.administrators()}
        </Paper>
      );
    } else {
      return (
        <Paper
          elevation={3}
          style={{
            height: "20em",
            backgroundColor: "white",
            paddingTop: "2em",
            // paddingLeft: "13em",
          }}
        >
          <div
            style={{
              paddingTop: "7em",
              paddingLeft: "12em",
            }}
          >
            <CircularProgress />
          </div>
        </Paper>
      );
    }
  }
}
