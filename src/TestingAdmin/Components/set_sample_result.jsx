import React, { Component } from "react";
import List from "@material-ui/core/List";
import Sample from "./sample";
import CircularProgress from "@material-ui/core/CircularProgress";
import API_ENDPOINT from "../../Connectivity/api_endpoint";

export default class SetResults extends Component {
  constructor(props) {
    super(props);
    this.samples = [];
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const response = await API_ENDPOINT.get("/getallsamples");
    let samples_data = response.data.msg;
    if (samples_data !== "ERROR")
      samples_data.forEach((sample) => {
        this.samples.push(
          <Sample username={sample.username} taken_on={sample.taken_on} />
        );
      });
    this.setState({
      isLoading: false,
    });
  }

  all_samples = () => {
    return (
      <div
        style={{
          marginTop: "3em",
          paddingLeft: "10em",
        }}
      >
        <List>{this.samples}</List>
      </div>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div
          style={{
            marginTop: "10em",
            paddingLeft: "36em",
          }}
        >
          <CircularProgress />
        </div>
      );
    } else {
      return this.all_samples();
    }
  }
}
