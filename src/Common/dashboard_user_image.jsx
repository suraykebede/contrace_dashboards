import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import API_ENDPOINT from "../Connectivity/api_endpoint";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class dashboard_user_image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_loaded: false,
    };
  }

  image_url = "";

  async componentDidMount() {
    let query = `/imagegetter?username=${this.props.username}`;
    const response = await API_ENDPOINT.get(query);
    let msg = response.data.msg;
    this.image_url = msg;
    this.setState({
      image_loaded: true,
    });
  }

  render() {
    if (this.state.image_loaded) {
      return (
        <div>
          <Avatar
            src={this.image_url}
            style={{
              height: this.props.from === "testing" ? "4em " : "3em",
              width: this.props.from === "testing" ? "4em " : "3em",
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Avatar
            style={{
              height: this.props.from === "testing" ? "5em " : "4em",
              width: this.props.from === "testing" ? "5em " : "4em",
            }}
          >
            <CircularProgress />
          </Avatar>
        </div>
      );
    }
  }
}
