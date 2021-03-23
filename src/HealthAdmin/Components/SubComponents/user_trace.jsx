import React, { Component } from "react";
import UserImage from "../../../Common/dashboard_user_image";
import { Button, Card, Typography } from "@material-ui/core";
import API_ENDPOINT from "../../../Connectivity/api_endpoint";
import swal from "sweetalert";

export default class user_trace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.fullname = "";
  }

  async componentDidMount() {
    const response = await API_ENDPOINT.get(
      `/getfullname?username=${this.props.username}`
    );
    let person = response.data.msg;
    this.fullname = `${person.first_name} ${person.last_name}`;

    this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <Card
        style={{
          width: "33vw",
          backgroundColor: this.props.infected ? "red" : "white",
        }}
      >
        {this.furtherInformation}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <UserImage username={this.props.username} from={"user trace"} />
          <Typography
            style={{
              marginLeft: "3em",
            }}
            variant="h5"
          >
            {this.state.loading ? "getting fullname" : this.fullname}
          </Typography>
        </div>

        <div>
          <Button
            onClick={() => {
              swal(
                "Users with Direct contact with " + this.fullname,
                this.props.met_users.toString(),
                "info"
              );
            }}
          >
            Met Users ({this.props.met_users.length})
          </Button>
          <Button
            onClick={() => {
              swal(
                "Venues Visited by" + this.fullname,
                this.props.venues.toString(),
                "info"
              );
            }}
          >
            Venues ({this.props.venues.length})
          </Button>
          <Button
            onClick={() => {
              swal(
                "Users with Indirect Contact with " + this.fullname,
                this.props.met_users.toString(),
                "info"
              );
            }}
          >
            Indirectly Met Users ({this.props.indirect.length})
          </Button>
        </div>
      </Card>
    );
  }
}
