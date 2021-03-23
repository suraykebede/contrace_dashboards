import React, { Component } from "react";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

export default class icon_provider extends Component {
  render() {
    if (this.props.icon_value === 3) {
      return (
        <div>
          <SupervisorAccountIcon
            style={{
              height: "2em",
              width: "2em",
            }}
          />
        </div>
      );
    } else if (this.props.icon_value === 2) {
      return (
        <div>
          <LibraryAddCheckIcon
            style={{
              height: "2em",
              width: "2em",
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <BusinessCenterIcon
            style={{
              height: "2em",
              width: "2em",
            }}
          />
        </div>
      );
    }
  }
}
