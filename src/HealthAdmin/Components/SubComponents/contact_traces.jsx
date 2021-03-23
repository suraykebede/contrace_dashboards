import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import UserTrace from "./user_trace";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import API_ENDPOINT from "../../../Connectivity/api_endpoint";
import Slide from "@material-ui/core/Slide";
//import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
//import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class contact_traces extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      open: true,
    };
    this.traces = [];
    this.traces_components = [];
  }

  furtherInformation = () => {
    <div>
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={() => {
          this.setState({
            open: false,
          });
        }}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{
            position: "relative",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                this.setState({
                  open: false,
                });
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              style={{
                marginLeft: "10vw",
                flex: 1,
              }}
            >
              Sound
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                this.setState({
                  open: false,
                });
              }}
            >
              Close
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>;
  };

  async componentDidMount() {
    const response = await API_ENDPOINT.get(`/alltraces`);
    //console.log(response.data);
    this.traces = response.data;
    console.log(this.traces);
    this.setState({
      loading: false,
    });
  }

  open = () => {
    this.setState({
      open: true,
    });
  };

  close = () => {
    this.setState({
      open: false,
    });
  };

  loading() {
    return (
      <div
        style={{
          marginLeft: "41vw",
          marginTop: "20vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  after_loading() {
    for (let index = 0; index < this.traces.length; index++) {
      const username = this.traces[index].username;
      const indirect = this.traces[index].indirect;
      const venues = this.traces[index].venues;
      const met_users = this.traces[index].met_users;
      const infected = this.traces[index].infected;
      this.traces_components.push(
        <Grid
          xs={6}
          style={{
            marginBottom: "2em",
          }}
        >
          <UserTrace
            infected={infected}
            username={username}
            met_users={met_users}
            venues={venues}
            indirect={indirect}
          />
        </Grid>
      );
    }
    return (
      <div>
        {this.furtherInformation()}
        <Grid container>{this.traces_components}</Grid>
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "4em",
        }}
      >
        {this.state.loading ? this.loading() : this.after_loading()}
      </div>
    );
  }
}
