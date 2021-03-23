import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DashboardUserImage from "../Common/dashboard_user_image";
import { AppContext } from "../Context/application_context";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Venue from "./Components/venue";
import Analytics from "./Components/analytics";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default class health_administrator extends Component {
  static contextType = AppContext;

  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }

  handleChangeIndex = (event, newIndex) => {
    this.setState({
      value: newIndex,
    });
  };

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    return (
      <div>
        <AppBar
          style={{
            height: "5em",
            backgroundColor: "#282c36",
            position: "fixed",
          }}
        >
          <Toolbar>
            <Typography variant="h6">Health administrator</Typography>
            <div
              style={{
                marginLeft: "75%",
              }}
            >
              <DashboardUserImage
                username={this.context.auth_username_verify()}
              />
              <Typography>{this.context.auth_username_verify()}</Typography>
            </div>
          </Toolbar>
        </AppBar>
        <div
          style={{
            marginTop: "5em",
          }}
        >
          <AppBar
            position="fixed"
            color="default"
            style={{
              marginTop: "5em",
            }}
          >
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Venues" {...a11yProps(0)} />
              <Tab label="Analytics" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <div
            style={{
              marginTop: "6em",
            }}
          >
            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabPanel value={this.state.value} index={0}>
                <Venue />
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <Analytics />
              </TabPanel>
            </SwipeableViews>
          </div>
        </div>
      </div>
    );
  }
}
