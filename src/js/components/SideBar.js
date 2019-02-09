import React, { Component } from "react";
import { Text } from "react-native";
import { Icon } from "native-base";

import { Content, View } from "native-base";

const styles = {
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  profileIcon: {
    flex: 1,
    height: 250,
    borderBottomColor: "#c3c7ca",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  navigationList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  navigationLink: {
    fontSize: 25,
    marginLeft: 35,
    marginTop: 15,
    width: "100%"
  },
  icon: {
    fontSize: 55
  }
};

import { connect } from "react-redux";

@connect(store => {
  return {
    user: store.auth.user
  };
})
export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  navigate = route => {
    this.props.navigation.navigate({ routeName: route });
  };

  render() {
    return (
      <Content style={styles.content}>
        <View style={styles.profileIcon}>
          <Icon
            name="md-person"
            style={styles.icon}
            onPress={() => this.props.navigation.navigate("Settings")}
          />
          <Text>{this.props.user.legalName}</Text>
        </View>
        <View style={styles.navigationList}>
          <Text
            style={styles.navigationLink}
            onPress={() => this.navigate("Map")}
          >
            Map
          </Text>
          <Text
            style={styles.navigationLink}
            onPress={() => this.navigate("Messages")}
          >
            Messages
          </Text>
        </View>
        <View style={styles.navigationList}>
          <Text
            style={styles.navigationLink}
            onPress={() => {
              this.navigate("Auth");
              this.props.dispatch({ type: "LOGOUT" });
            }}
          >
            Logout
          </Text>
        </View>
      </Content>
    );
  }
}

module.exports = SideBar;
