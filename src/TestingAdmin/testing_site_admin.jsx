import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DashboardUserImage from "../Common/dashboard_user_image";
import { AppContext } from "../Context/application_context";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import SetSampleResult from "./Components/set_sample_result";
import AddSample from "./Components/add_sample";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

export default class testing_site_admin extends Component {
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
            <Typography variant="h6">Testing site administrator</Typography>
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
              <Tab label="Register a sample" {...a11yProps(0)} />
              <Tab label="Set test result" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <div
            style={{
              marginTop: "8em",
            }}
          >
            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabPanel value={this.state.value} index={0}>
                <AddSample />
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <SetSampleResult />
              </TabPanel>
            </SwipeableViews>
          </div>
        </div>
      </div>
    );
  }
}
