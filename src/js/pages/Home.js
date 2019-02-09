import React from "react";
import { Body, Card, CardItem, Drawer, Button, H1, Icon } from "native-base";
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import SideBar from "../components/SideBar";
import { BarChart, ProgressCircle, XAxis } from "react-native-svg-charts";
import { connect } from "react-redux";

@connect(store => {
  return {
    user: store.auth.user
  };
})
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        type={Platform.OS === "ios" ? "static" : "displace"}
        panOpenMask={0.05}
        content={<SideBar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon
              name="menu"
              style={styles.menuIcon}
              onPress={() => this.openDrawer()}
            />
            <H1 style={{ marginTop: 30 }}>Mobile</H1>
          </View>
        </View>
      </Drawer>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f8f9fa",
    padding: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 150,
    paddingRight: 20
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40
  },
  menuButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    marginTop: 30,
    marginLeft: 30,
    backgroundColor: "#e4e2e2",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  menuIcon: {
    color: "black",
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1
  },
  cards: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  topCards: {
    flex: 1,
    padding: 5
  },
  bottomCard: {
    flex: 1
  },
  center: {
    flex: 1,
    width: "100%",
    justifyContent: "center"
  },
  touchableCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loading: {
    flex: 1,
    justifyContent: "center"
  },
  recentActiviy: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  recentActivityIcon: {
    fontSize: 100,
    textAlign: "center"
  },
  palmScore: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
};
