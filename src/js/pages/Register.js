import React, { Component } from "react";
import {
  Button,
  Container,
  Content,
  Item,
  Input,
  Label,
  Picker,
  Text,
  View
} from "native-base";
import { register } from "../actions/authentication";

const styles = {
  container: {
    flex: 1
  },
  form: {
    flex: 1,
    margin: 30,
    justifyContent: "space-between"
  },
  searchBox: {
    flex: 1,
    height: 300
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  formItem: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 20
  }
};

import { connect } from "react-redux";
@connect(store => {
  return {
    user: store.auth,
    loggedIn: store.auth.isLoggedIn
  };
})
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: ""
    };
  }

  onInputChange = async (input, value) => {
    this.setState({ [input]: value });
  };

  register = () => {
    this.props.dispatch({ type: "REGISTERING_USER", payload: this.state });
    this.props.dispatch(register(this.state, this.props.navigation));
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.form}>
            <Item
              stackedLabel
              style={styles.formItem}
              onPress={this.showDateTimePicker}
            >
              <Label>Legal Name</Label>
              <Input
                style={{ justifyContent: "flex-end" }}
                onChangeText={value => this.onInputChange("name", value)}
              />
            </Item>

            <Item stackedLabel style={styles.formItem}>
              <Label>Email</Label>
              <Input
                keyboardType={"email-address"}
                onChangeText={value => this.onInputChange("email", value)}
              />
            </Item>
            <Item stackedLabel style={styles.formItem}>
              <Label>Phone</Label>
              <Input
                keyboardType={"phone-pad"}
                onChangeText={value => this.onInputChange("phone", value)}
              />
            </Item>
            <Item stackedLabel style={styles.formItem}>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={value => this.onInputChange("password", value)}
              />
            </Item>
            <Button
              primary
              full
              style={{ width: "100%", marginTop: 20 }}
              onPress={this.register}
            >
              <Text style={styles.button}>Register</Text>
            </Button>
            {this.props.user && this.props.user.error ? (
              <Text style={{ color: "red" }}>{this.props.user.error}</Text>
            ) : null}
          </View>
        </Content>
      </Container>
    );
  }
}
