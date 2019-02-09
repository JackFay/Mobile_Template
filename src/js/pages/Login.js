import React from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  View
} from "react-native";
import { Container, Item, Input, Label, Button, Text } from "native-base";
import * as auth from "../actions/authentication";
const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#f8f9fa"
  },
  formItem: {
    marginTop: 20
  },
  button: {
    textAlign: "center",
    color: "white",
    fontSize: 18
  },
  activeFormItem: {
    borderBottomColor: "blue"
  },
  activeLabel: {
    color: "blue"
  },
  loading: {
    flex: 1,
    justifyContent: "center"
  },
  media: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
};
import { connect } from "react-redux";
@connect(store => {
  return {
    user: store.auth,
    loggedIn: store.auth.isLoggedIn
  };
})
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "5734246735",
      password: "test",
      usernameActive: false,
      passwordActive: false
    };
  }

  async componentDidMount() {}

  login = async () => {
    this.props.dispatch(
      auth.login(
        this.state.username,
        this.state.password,
        this.props.navigation
      )
    );
  };

  onInputChange = (input, value) => {
    this.setState({ [input]: value });
  };

  render() {
    if (this.props.user && this.props.user.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <Container style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 27 }}>Line Jump</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 3, justifyContent: "center" }}
        >
          <Item stackedLabel style={styles.formItem}>
            <Label>Username</Label>
            <Input
              onChangeText={value => this.onInputChange("username", value)}
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
            onPress={this.login}
          >
            <Text style={styles.button}>Login</Text>
          </Button>
          {this.props.user && this.props.user.error ? (
            <Text style={{ color: "red" }}>{this.props.user.error}</Text>
          ) : null}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
