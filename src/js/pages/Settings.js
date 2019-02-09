import React, { Component } from "react";
import {
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Left,
  Text,
  Right
} from "native-base";

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
};

import { connect } from "react-redux";
@connect(store => {
  return {
    user: store.auth.user
  };
})
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigate = route => {
    this.props.navigation.navigate({ routeName: route });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem onPress={() => this.navigate("Profile")}>
              <Left>
                <Text>Account Info</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={() => this.navigate("ClinicianRegistration")}>
              <Left>
                <Text>Register as a clinician</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Change Password</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Version 1.0.0</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
