import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Container, Item, Input, Label, Button, Text } from "native-base";
import { verify } from "../actions/authentication";
const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  formItem: {
    marginTop: 20
  },
  buttonText: {
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
  }
};
import { connect } from "react-redux";
@connect(store => {
  return {
    user: store.auth.user,
    error: store.auth.error,
    loggedIn: store.auth.isLoggedIn
  };
})
export default class VerifyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  async componentDidMount() {}

  verify = async () => {
    this.props.dispatch(
      verify(this.props.user, this.state.code, this.props.navigation)
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
        <Item stackedLabel style={styles.formItem}>
          <Label>Access Code</Label>
          <Input
            keyboardType={"numeric"}
            onChangeText={value => this.onInputChange("code", value)}
          />
        </Item>
        <Button
          primary
          full
          style={{ width: "100%", marginTop: 20 }}
          onPress={this.verify}
        >
          <Text style={styles.buttonText}>Verify Account</Text>
        </Button>
        {this.props.error ? (
          <Text style={{ color: "red" }}>{this.props.error}</Text>
        ) : null}
      </Container>
    );
  }
}
