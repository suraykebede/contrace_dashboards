import React, { Component } from "react";
import ApplicationContextProvider from "./Context/application_context";
import ApplicationRouter from "./Routes/application_router";

export default class App extends Component {
  render() {
    return (
      <div>
        <ApplicationContextProvider>
          <ApplicationRouter />
        </ApplicationContextProvider>
      </div>
    );
  }
}
