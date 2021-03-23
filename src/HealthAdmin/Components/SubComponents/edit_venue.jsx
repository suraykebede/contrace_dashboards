import React, { Component } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import api_endpoint from "../../../Connectivity/api_endpoint";
import { Map, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";
import swal from "sweetalert";

export default class edit_venue extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      venue: "",
      new_administrator: "",
      //   new_venue_latitude: "",
      //   new_venue_longitude: "",
      venue_name: "",
      administrator: "",
      venue_latitude: "",
      venue_longitude: "",
    };
    this.venues = [];
    this.venue_components = [];
  }

  async componentDidMount() {
    const venues = await api_endpoint.get("/allvenues");
    this.venues = venues.data;
    this.setState({
      loading: false,
    });
  }

  show_venues() {
    for (let index = 0; index < this.venues.length; index++) {
      this.venue_components.push(
        this.Venue(
          this.venues[index].venue,
          this.venues[index].venue_name,
          this.venues[index].administrator,
          this.venues[index].venue_latitude,
          this.venues[index].venue_longitude
        )
      );
    }
    return this.venue_components;
  }

  Venue = (
    venue,
    venue_name,
    administrator,
    venue_latitude,
    venue_longitude
  ) => {
    return (
      <Paper
        elevation={3}
        style={{
          width: "20em",
          height: "10em",
          marginBottom: "1.5em",
        }}
      >
        <Typography align="center">{venue_name}</Typography>
        <Typography align="center">{venue}</Typography>
        <Typography align="center">{administrator}</Typography>
        <div
          style={{
            marginTop: "3em",
            marginBottom: "0",
          }}
        >
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "1em",
            }}
            onClick={() => {
              this.setState({
                venue: venue,
                venue_name: venue_name,
                administrator: administrator,
                venue_latitude: venue_latitude,
                venue_longitude: venue_longitude,
              });
            }}
          >
            Edit
          </Button>
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => {
              this.setState({
                venue: "",
                venue_name: "",
                administrator: "",
                venue_longitude: "",
                venue_latitude,
              });
            }}
          >
            Close
          </Button>
        </div>
      </Paper>
    );
  };

  editor = () => {
    if (this.state.venue === "") {
      return "";
    } else {
      return (
        <Paper
          elevation={3}
          style={{
            //  position: "fixed",
            width: "100%",
            height: "75vh",
            backgroundColor: "#ffffcf",
          }}
        >
          <Typography align="center">{this.state.venue_name}</Typography>
          <Map
            onclick={(e) => {
              this.setState({
                venue_latitude: e.latlng.lat,
                venue_longitude: e.latlng.lng,
              });
            }}
            style={{
              height: "60vh",
              width: "100%",
              // position: "fixed",
              //   zIndex: "0",
            }}
            zoom={15}
            center={{
              lat: this.state.venue_latitude,
              lng: this.state.venue_longitude,
            }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={{
                lat: this.state.venue_latitude,
                lng: this.state.venue_longitude,
              }}
              opacity={1}
              icon={icon({
                iconUrl: "https://assets.mapquestapi.com/icon/v2/marker@2x.png",
              })}
            ></Marker>
          </Map>
          <div
            style={{
              marginLeft: "10em",
            }}
          >
            <TextField
              value={this.state.new_administrator}
              placeholder="New Administrator"
              onChange={(e) => {
                if (this.state.new_administrator.length === 0) {
                  this.setState({
                    new_administrator: "@" + e.target.value,
                  });
                } else {
                  this.setState({
                    new_administrator: e.target.value,
                  });
                }
              }}
            ></TextField>{" "}
            <Button
              onClick={async () => {
                if (
                  this.state.new_administrator === "" ||
                  this.state.new_administrator === null
                ) {
                  swal("Unable to update", "Empty field", "error");
                } else {
                  swal("Updating", "Please Hold on", "info");
                  const updating = await api_endpoint.post("/update_venue", {
                    venue: this.state.venue,
                    old_admin: this.state.administrator,
                    administrator: this.state.new_administrator,
                    venue_latitude: this.state.venue_latitude,
                    venue_longitude: this.state.venue_longitude,
                  });
                  let response = updating.data;

                  if (response === "NO_SUCH_USER") {
                    swal(
                      "Unable to update",
                      "The user does not exist",
                      "error"
                    );
                  } else {
                    swal("Updated", "Information has been updated", "success");
                  }
                }
              }}
            >
              Update
            </Button>
          </div>
        </Paper>
      );
    }
  };

  render() {
    console.log(
      `latitude ${this.state.venue_latitude}, longitude ${this.state.venue_longitude}`
    );
    return (
      <Grid container>
        <Grid xs={6}>
          {this.state.loading ? <CircularProgress /> : this.show_venues()}
        </Grid>
        <Grid xs={6}>{this.editor()}</Grid>
      </Grid>
    );
  }
}
