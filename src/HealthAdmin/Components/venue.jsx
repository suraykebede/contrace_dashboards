import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddVenue from "./SubComponents/add_venue";
import EditVenue from "./SubComponents/edit_venue";
import ShowQRImage from "./SubComponents/show_qr_image";

export default class venue extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
    };
  }

  component_to_render = () => {
    if (this.state.current === 0) {
      return <AddVenue />;
    } else if (this.state.current === 1) {
      return <EditVenue />;
    } else {
      return <ShowQRImage />;
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "0.25em",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            onClick={(e) => {
              this.setState({
                current: 0,
              });
            }}
          >
            Add Venue
          </Button>
          <Button
            onClick={(e) => {
              this.setState({
                current: 1,
              });
            }}
          >
            Edit Venue Properties
          </Button>
          <Button
            onClick={(e) => {
              this.setState({
                current: 2,
              });
            }}
          >
            Get QR
          </Button>
        </div>
        <div style={{ marginTop: "0.25em" }}>{this.component_to_render()}</div>
      </div>
    );
  }
}
