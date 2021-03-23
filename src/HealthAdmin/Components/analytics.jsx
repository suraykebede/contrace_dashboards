import React, { Component } from "react";
import IndicativeMap from "./SubComponents/indicative_map";
import ContactTraces from "./SubComponents/contact_traces";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = (users, contact_traces, venues, samples) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Users
        </Text>
      </View>
    </Page>

    <Page>
      <View style={styles.section}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Samples
        </Text>
      </View>
    </Page>

    <Page>
      <View style={styles.section}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Contact Traces
        </Text>
      </View>
    </Page>
    <Page>
      <View style={styles.section}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Samples
        </Text>
      </View>
    </Page>
  </Document>
);

export default class analytics extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
    };
  }

  component_to_render = () => {
    if (this.state.current === 0) {
      return <IndicativeMap />;
    } else {
      return <ContactTraces />;
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "0.25em",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            onClick={(e) => {
              this.setState({
                current: 0,
              });
            }}
          >
            Indicative Map
          </Button>
          <Button
            onClick={(e) => {
              this.setState({
                current: 1,
              });
            }}
          >
            Contact Traces
          </Button>
          <Button
            startIcon={<GetAppIcon />}
          >
            <PDFDownloadLink document={<MyDocument />} fileName="summary.pdf">
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Export Summaries as PDF"
              }
            </PDFDownloadLink>
          </Button>
        </div>
        <div style={{ marginTop: "0.25em" }}>{this.component_to_render()}</div>
      </div>
    );
  }
}
