import React from "react";

import { connect } from "react-redux";
import { Button, Container, Icon } from "native-base";
import { NavigationActions } from "react-navigation";
import { ScrollView } from "react-native";
import NotificationCard from "../components/NotificationCard";

const styles = {
  container: {
    flex: 1
  },
  add: {
    alignSelf: "flex-end"
  },
  icon: {
    fontSize: 35
  },
  scrollView: {
    flex: 1
  }
};

@connect(store => {
  return {
    notifications: store.userActionsReducer.notifications
  };
})
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigate = route => {
    this.props.dispatch(NavigationActions.navigate({ routeName: route }));
  };

  render() {
    const NotificationCards = this.props.notifications.map(
      (notification, index) => {
        return (
          <NotificationCard
            key={index}
            title={notification.title}
            message={notification.message}
          />
        );
      }
    );
    return (
      <Container style={styles.container}>
        <ScrollView style={styles.scrollView}>{NotificationCards}</ScrollView>
      </Container>
    );
  }
}
