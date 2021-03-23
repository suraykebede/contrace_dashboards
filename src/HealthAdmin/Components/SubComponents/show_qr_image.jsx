import React, { Component } from "react";
import QRCode from "qrcode.react";
import { TextField, Button, Grid } from "@material-ui/core";

export default class show_qr_image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venue_name: "",
      venue_identifier: "",
      data: "test",
    };
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="input venue identifier here"
              onChange={(e) => {
                this.setState({
                  venue_identifier: e.target.value,
                });
              }}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="input venue name here"
              onChange={(e) => {
                this.setState({
                  venue_name: e.target.value,
                });
              }}
            ></TextField>
          </Grid>
          <Grid>
            <Button
              onClick={(e) => {
                this.setState({
                  data:
                    "http://" +
                    this.state.venue_identifier +
                    "/" +
                    this.state.venue_name +
                    ".me",
                });
              }}
            >
              Generate
            </Button>
          </Grid>
        </Grid>
        <div>
          <QRCode
            value={this.state.data}
            id={this.state.venue_name}
            size={350}
            level={"H"}
            includeMargin={true}
          />
        </div>

        <Button
          onClick={(e) => {
            const canvas = document.getElementById(this.state.venue_name);
            const pngUrl = canvas
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = `${this.state.venue_name}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
          }}
        >
          Download
        </Button>
      </div>
    );
  }
}
