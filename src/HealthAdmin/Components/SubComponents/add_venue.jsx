import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Map, TileLayer, Marker } from "react-leaflet";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import swal from "sweetalert";
import { icon } from "leaflet";
import API_ENDPOINT from "../../../Connectivity/api_endpoint";

export default class add_venue extends Component {
  constructor() {
    super();
    this.sub_cities = [
      "Addis Ketema",
      "Akaki Kality",
      "Arada",
      "Bole",
      "Gullele",
      "Kirkos",
      "kolfe Keranio",
      "Lideta",
      "Nifas Silk-Lafto",
      "Yeka",
    ];
    this.types = ["Stationary", "Moving"];
    this.services = [
      "Home",
      "Ride sharing",
      "Food services and hospitality",
      "School",
      "Place of worship",
      "Government offices",
      "Other",
    ];
    this.state = {
      subcity_index: 0,
      venue_type_index: 1,
      service_index: 0,
      administrator: "",
      venue_latitude: 8.9806,
      venue_longitude: 38.7578,
      service: "Home",
      license_plate: "",
      sub_city: "Addis Ketema",
      venue_name: "",
      venue_type: "Stationary",
      venue: "",
      zoom: 16,
      license_field: true,
    };
  }

  get_selected_subsity = (index) => {
    this.setState({
      sub_city: this.sub_cities[index],
      subcity_index: index,
    });
  };

  get_selected_service = (index) => {
    this.setState({
      service: this.services[index],
      service_index: index,
    });
  };

  get_selected_type = (index) => {
    this.setState({
      venue_type: this.types[index],
      venue_type_index: index,
      license_plate: "NON",
      license_field: !this.state.license_field,
    });
  };

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div
              style={{
                height: "28em",
                width: "40em",
              }}
            >
              <Map
                onclick={(e) => {
                  this.setState({
                    venue_latitude: e.latlng.lat,
                    venue_longitude: e.latlng.lng,
                  });
                }}
                zoom={this.state.zoom}
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
                    lat: this.state.venue_latitude - 0.000000001,
                    lng: this.state.venue_longitude - 0.000000001,
                  }}
                  opacity={1}
                  icon={icon({
                    iconUrl:
                      "https://assets.mapquestapi.com/icon/v2/marker@2x.png",
                  })}
                ></Marker>
              </Map>
            </div>
          </Grid>
          <form
            style={{
              width: "40em",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              if (
                this.state.venue === "" ||
                this.state.venue_name === "" ||
                this.state.administrator === ""
              ) {
                swal("Unable to add venue", "Fill out empty fields", "warning");
              } else {
                swal({
                  title: "Add venue?",
                  text:
                    `About to add ${this.state.venue_name}`,
                  icon: "info",
                  buttons: true,
                  dangerMode: true,
                }).then(async (add) => {
                  if (add) {
                    const venue_adder = await API_ENDPOINT.post("/addvenue", {
                      venue_name: this.state.venue_name,
                      venue: this.state.venue,
                      attendees: 0,
                      venue_latitude: this.state.venue_latitude,
                      venue_longitude: this.state.venue_longitude,
                      venue_type: this.state.venue_type,
                      service: this.state.service,
                      administrator: this.state.administrator,
                      infection: false,
                      license_plate: this.state.license_plate,
                    });
                    let response = venue_adder.data.msg;
                    if (response === "ERROR") {
                      swal(
                        "Unable to add venue",
                        "Please try again later",
                        "error"
                      );
                    } else if (response === "NO_SUCH_USER") {
                      swal(
                        "Unable to add venue",
                        `the username ${this.state.administrator} does not exist`,
                        "error"
                      );
                    } else {
                      swal("Venue added", this.state.venue_name, "info");
                    }
                  }
                });
              }
            }}
          >
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                fullWidth
                placeholder="start typing, '@_' will appear"
                helperText="ex. '@_solcafe9', 8 charachters after '@_'"
                value={this.state.venue}
                onChange={(e) => {
                  if (this.state.venue.length === 0) {
                    this.setState({ venue: "@_" + e.target.value });
                  } else {
                    this.setState({ venue: e.target.value });
                  }
                }}
                label="Venue Identifier"
                style={{
                  marginTop: "1em",
                }}
              ></TextField>
              <TextField
                fullWidth
                onChange={(e) => {
                  this.setState({ venue_name: e.target.value });
                }}
                label="Venue Name"
                style={{
                  marginTop: "1em",
                }}
              ></TextField>
              <TextField
                fullWidth
                onChange={(e) => {
                  this.setState({ administrator: e.target.value });
                }}
                label="Administrator"
                style={{
                  marginTop: "1em",
                }}
              ></TextField>
              <TextField
                fullWidth
                disabled={!this.state.license_field}
                onChange={(e) => {
                  this.setState({ license_plate: e.target.value });
                }}
                label="License Plate"
                style={{
                  marginTop: "1em",
                }}
              ></TextField>
              <Grid
                spacing={2}
                container
                style={{
                  marginBottom: "1.5em",
                  marginTop: "1.5em",
                }}
              >
                <Grid xs={4}>
                  <Select
                    style={{
                      width: "7em",
                    }}
                    value={this.state.venue_type_index}
                    onChange={(e) => {
                      this.get_selected_type(e.target.value);
                    }}
                  >
                    <MenuItem value={0}>Stationary</MenuItem>
                    <MenuItem value={1}>Moving</MenuItem>
                  </Select>
                </Grid>
                <Grid xs={4}>
                  <Select
                    style={{
                      width: "7em",
                    }}
                    // label={this.state.service}
                    value={this.state.service_index}
                    onChange={(e) => {
                      this.get_selected_service(e.target.value);
                    }}
                  >
                    <MenuItem value={0}>Home</MenuItem>
                    <MenuItem value={1}>Ride Sharing</MenuItem>
                    <MenuItem value={2}>Food services and hospitality</MenuItem>
                    <MenuItem value={4}>School</MenuItem>
                    <MenuItem value={5}>Place of worship</MenuItem>
                    <MenuItem value={6}>Government offices</MenuItem>
                    <MenuItem value={7}>Other</MenuItem>
                  </Select>
                </Grid>
                <Grid xs={4}>
                  <Select
                    style={{
                      width: "11em",
                    }}
                    //label={this.state.sub_city}
                    value={this.state.subcity_index}
                    onChange={(e) => {
                      this.get_selected_subsity(e.target.value);
                    }}
                  >
                    <MenuItem value={0}>Addis Ketema</MenuItem>
                    <MenuItem value={1}>Akaki Kality</MenuItem>
                    <MenuItem value={2}>Arada</MenuItem>
                    <MenuItem value={3}>Bole</MenuItem>
                    <MenuItem value={4}>Gullele</MenuItem>
                    <MenuItem value={5}>Kirkos</MenuItem>
                    <MenuItem value={6}>Kolfe Keranio</MenuItem>
                    <MenuItem value={7}>Lideta</MenuItem>
                    <MenuItem value={8}>Nefas Silk-Lafto</MenuItem>
                    <MenuItem value={9}>Yeka</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                style={{
                  marginTop: "1em",
                  backgroundColor: "Background",
                  color: "white",
                }}
              >
                Add
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
    );
  }
}
