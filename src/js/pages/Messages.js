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

import { connect } from "react-redux";
@connect(store => {
  return {
    user: store.auth.user
  };
})
export default class Messages extends Component {
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
            <ListItem onPress={() => this.navigate("ChatRoom")}>
              <Left>
                <Text>Chat 1</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
};
