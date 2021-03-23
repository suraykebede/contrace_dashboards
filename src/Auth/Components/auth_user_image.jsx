import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import API_ENDPOINT from "../../Connectivity/api_endpoint";

export default class auth_user_image extends Component {
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
              height: "4em",
              width: "4em",
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Avatar
            style={{
              height: "4em",
              width: "4em",
            }}
          >
            <CircularProgress />
          </Avatar>
        </div>
      );
    }
  }
}
