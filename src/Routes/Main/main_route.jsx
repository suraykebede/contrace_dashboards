import React, { Component } from "react";
import { AppContext } from "../../Context/application_context";
import HealthAdmin from "../../HealthAdmin/health_administrator";
import TestingSite from "../../TestingAdmin/testing_site_admin";
import SysAdmin from "../../SysAdmin/system_admin";

export default class main_route extends Component {
  static contextType = AppContext;

  render() {
    this.auth_level = this.context.auth_level_verify();
    this.username = this.context.auth_username_verify();

    if (this.auth_level === 1) {
      return (
        <div>
          <SysAdmin username={this.username} />
        </div>
      );
    } else if (this.auth_level === 2) {
      return (
        <div>
          <TestingSite />
        </div>
      );
    } else {
      return (
        <div>
          <HealthAdmin />
        </div>
      );
    }
  }
}
