import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import UserImage from "../../Common/dashboard_user_image";
import api_endpoint from "../../Connectivity/api_endpoint";
import swal from "sweetalert";

export default class administrator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      removed: false,
    };
    this.fullname = "";
  }

  async componentDidMount() {
    const fullname_data = await api_endpoint.get(
      "/getfullname?username=" + this.props.username
    );
    this.fullname =
      fullname_data.data.msg.first_name +
      " " +
      fullname_data.data.msg.last_name;
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.removed) {
      return "";
    } else {
      return (
        <Card
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "2em",
          }}
        >
          <UserImage username={this.props.username} />
          <div
            style={{
              float: "right",
              marginLeft: "9em",
            }}
          >
            <Typography align="center">
              {this.state.loading ? "Please wait" : this.fullname}
            </Typography>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                marginTop: "2em",
              }}
              startIcon={<HighlightOffIcon />}
              onClick={() => {
                let message = `About to revoke ${this.props.access} administrative access from ${this.fullname}`;
                swal({
                  title: "Remove Access",
                  text: message,
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then(async (willDelete) => {
                  if (this.props.access === "health") {
                    const health = await api_endpoint.delete(
                      "/remove_healthadmin?username=" + this.props.username
                    );
                    if (health.data.msg === "ADMIN_REMOVED") {
                      swal("Removed", "Access has been revoked", "success");
                    } else {
                      swal("Error", "Something is wrong", "error");
                    }
                  } else {
                    const testing = await api_endpoint.delete(
                      "/remove_testadmin?username=" + this.props.username
                    );
                    console.log("Message from server "+testing.data.msg);
                    if (testing.data.msg === "ADMIN_REMOVED") {
                      swal("Removed", "Access has been revoked", "success");
                    } else {
                      swal("Error", "Something is wrong", "error");
                    }
                  }
                });
              }}
            >
              Remove Access
            </Button>
          </div>
        </Card>
      );
    }
  }
}
