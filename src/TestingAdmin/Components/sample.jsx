import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import API_ENDPOINT from "../../Connectivity/api_endpoint";
import DashboardUserImage from "../../Common/dashboard_user_image";
import moment from "moment";

export default class sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const response = await API_ENDPOINT.get(
      `/getfullname?username=${this.props.username}`
    );
    let person = response.data.msg;
    this.name = person.first_name + " " + person.last_name;
    this.setState({
      isloading: false,
    });
  }

  setTestResult = (result) => {
    if (result === "positive") {
      swal({
        title: "Are you certain?",
        text: "Once you confirm, the notification process will commence",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          swal("Initiating Trace", "Please wait", "info");
          let set_positive = await API_ENDPOINT.post("/testsample", {
            username: this.props.username,
            result: "POSITIVE",
          });
          swal(
            "Trace Complete",
            "All entities of interest have been notified",
            {
              icon: "success",
            }
          );
        } else {
          swal("Test result not set", {
            icon: "info",
          });
        }
      });
    } else {
      swal({
        title: "Are you certain?",
        text: "Once you confirm, no notifications will be sent",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          swal("Setting result set to 'Negative'", {
            icon: "info",
          });
          let set_negative = await API_ENDPOINT.post("/testsample", {
            username: this.props.username,
            result: "NEGATIVE",
          });
          swal("Done", "Result set to 'Negative'", "info");
        } else {
          swal("Test result not set", {
            icon: "info",
          });
        }
      });
    }
  };

  render() {
    console.log(this.props.taken_on);
    let d = new Date();
    d.setMilliseconds(this.props.taken_on);
    return (
      <Paper
        elevation={3}
        style={{
          padding: "0.5em",
          marginLeft: "25%",
          marginRight: "33%",
          marginBottom: "3em",
          width: "33%",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <DashboardUserImage
              username={this.props.username}
              from={"results"}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>{this.props.username}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{moment(this.props.taken_on).fromNow()}</Typography>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Button
              style={{
                color: "white",
                backgroundColor: "#ff000c",
              }}
              startIcon={<CheckIcon />}
              onClick={() => this.setTestResult("positive")}
            >
              Positive
            </Button>{" "}
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Button
              style={{
                color: "white",
                backgroundColor: "#ff1aaa",
              }}
              startIcon={<CheckIcon />}
              onClick={() => this.setTestResult("negative")}
            >
              Negative
            </Button>{" "}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
