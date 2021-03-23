import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import AddAdmins from "./Components/add_admins";
import TestingSiteAdmins from "./Components/testing_site_admins";
import HealthAdmins from "./Components/health_admins";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { AppContext } from "../Context/application_context";
import DashboardUserImage from "../Common/dashboard_user_image";

export default class system_admin extends Component {
  static contextType = AppContext;

  render() {
    return (
      <div
        style={{
          height: "100vh",
        //  backgroundColor: "#aa79a0",
        }}
      >
        <AppBar
          style={{
            height: "5em",
            backgroundColor: "#282c36",
            position: "fixed",
          }}
        >
          <Toolbar>
            <Typography variant="h5">System Administrator</Typography>
            <div
              style={{
                marginLeft: "75%",
              }}
            >
              <DashboardUserImage
                username={this.context.auth_username_verify()}
              />
              <Typography>{this.context.auth_username_verify()}</Typography>
            </div>
          </Toolbar>
        </AppBar>
        <div
          style={{
            paddingTop: "6em",
          }}
        >
          <Grid container spacing={1}>
            <Grid xs={4} item>
              <AddAdmins />
            </Grid>
            <Grid xs={4} item>
              <HealthAdmins />
            </Grid>
            <Grid xs={4} item>
              <TestingSiteAdmins />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
