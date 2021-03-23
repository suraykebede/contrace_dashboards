import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import Card from "@material-ui/core/Card";
import { CircularProgress, Typography } from "@material-ui/core";
import { icon } from "leaflet";
import API_ENDPOINT from "../../../Connectivity/api_endpoint";

export default class indicative_map extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.indicative_map_information = [];
    this.my_markers = [];
  }

  async componentDidMount() {
    const indicative_map_data = await API_ENDPOINT.get("/coords");
   // console.log(indicative_map_data.data);
    this.indicative_map_information = indicative_map_data.data;
    console.log(this.indicative_map_information);
    for (
      let index = 0;
      index < this.indicative_map_information.length;
      index++
    ) {
      console.log("push marker with " + this.indicative_map_information[index]);
      this.my_markers.push(
        <Marker
          position={{
            lat: this.indicative_map_information[index].home_latitude,
            lng: this.indicative_map_information[index].home_longitude,
          }}
          opacity={1}
          icon={icon({
            iconUrl: "https://assets.mapquestapi.com/icon/v2/marker@2x.png",
          })}
        ></Marker>
      );
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            marginLeft: "46vw",
            marginTop: "20vh",
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    return (
      <div
        style={{
          height: "80vh",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Map
          style={{
            height: "67vh",
            width: "80vw",
            position: "relative",
            zIndex: "0",
          }}
          zoom={12}
          center={{
            lat: 8.9806,
            lng: 38.7578,
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker
            position={{
              lat: 8.9805010101,
              lng: 38.7577898,
            }}
            opacity={1}
            icon={icon({
              iconUrl: "https://assets.mapquestapi.com/icon/v2/marker@2x.png",
            })}
          ></Marker> */}
          {this.my_markers}
          {/* <Marker
            position={{
              lat: 8.9806992020,
              lng: 38.757911111,
            }}
            opacity={1}
            icon={icon({
              iconUrl: "https://assets.mapquestapi.com/icon/v2/marker@2x.png",
            })}
          ></Marker> */}
        </Map>
        <Card
          variant="outlined"
          style={{
            width: "25vw",
            height: "10em",
          }}
        >
          <Typography
            style={{
              marginTop: "1em",
              color: "blue",
            }}
            variant="h4"
            align="center"
          >
            Total infections
          </Typography>
          <Typography variant="h5" align="center">
            {this.my_markers.length}
          </Typography>
        </Card>
      </div>
    );
  }
}
