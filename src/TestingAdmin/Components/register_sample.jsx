import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import DashboardUserImage from "../../Common/dashboard_user_image";
import swal from "sweetalert";
import { Person } from "@material-ui/icons";
import API_ENDPOINT from "../../Connectivity/api_endpoint";

export default class register_sample extends Component {
  constructor(props) {
    super(props);
    this.name = "";
    this.state = {
      is_loading: true,
    };
  }

  avatar = () => {
    if (this.state.is_loading) {
      return (
        <Person
          style={{
            height: "4em",
            with: "4em",
          }}
        />
      );
    } else
      return (
        <DashboardUserImage username={this.props.username} from={"testing"} />
      );
  };

  async componentDidMount() {
    const response = await API_ENDPOINT.get(
      `/getfullname?username=${this.props.username}`
    );
    let person = response.data.msg;
    this.name = `${person.first_name} ${person.last_name}`;
    this.setState({
      is_loading: false,
    });
  }

  render() {
    return (
      <div
        style={{
          height: "20em",
          marginTop: "6em",
          borderColor: "#00ab",
          borderWidth: "0.1em",
          borderStyle: "solid",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          justifyItems: "center",
          flexDirection: "column",
          textAlign: "center",
          marginLeft: "20em",
          marginRight: "20em",
        }}
      >
        <Avatar
          style={{
            width: "5em",
            height: "5em",
            marginLeft: "14em",
          }}
        >
          {this.avatar()}
        </Avatar>
        <h2> {this.state.is_loading ? "getting information " : this.name}</h2>

        <Button
          onClick={async () => {
            console.log("username: " + this.props.username);
            swal("Registering sample", "please hold on", "info");
            let sample_adding = await API_ENDPOINT.post(`/addsample`, {
              username: this.props.username,
            });
            let response_data = sample_adding.data.msg;
            if (response_data === "SAMPLE_ADDED") {
              swal(
                "Sample added",
                "sample can now be found on the 'SET TEST RESULT' tab",
                "success"
              );
            } else {
              swal("unable to add sample", "service is unavailable", "error");
            }
          }}
          disabled={this.state.is_loading ? true : false}
          style={{
            marginTop: "4em",
            height: "5em",
            color: "white",
            backgroundColor: "#00ab",
          }}
        >
          register sample
        </Button>
      </div>
    );
  }
}
