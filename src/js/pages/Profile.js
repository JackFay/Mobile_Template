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
import { connect } from "react-redux";

@connect(store => {
  return {
    user: store.auth.user
  };
})
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.legalName,
      phone: props.user.phone,
      email: props.user.email,
      userId: props.user.userId
    };
  }

  onAccountTypeSelected = async value => {
    this.setState({ accountType: value });
  };

  onCareCategorySelected = async value => {
    await this.setState({ careCategory: value });
  };

  onInputChange = (input, value) => {
    this.setState({ [input]: value });
  };

  onSave = () => {
    this.props.navigation.pop();
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
              <Label>Name</Label>
              <Input
                style={{ justifyContent: "flex-end" }}
                value={this.state.name}
                onChangeText={value => this.onInputChange("name", value)}
              />
            </Item>
            <Item stackedLabel style={styles.formItem}>
              <Label>Email</Label>
              <Input
                onChangeText={value => this.onInputChange("email", value)}
                value={this.state.email}
              />
            </Item>
            <Item stackedLabel style={styles.formItem}>
              <Label>Phone Number</Label>
              <Input
                onChangeText={value => this.onInputChange("phone", value)}
                value={this.state.phone}
              />
            </Item>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
              <Button
                full
                style={{ width: 100, marginRight: 10 }}
                onPress={this.onSave}
              >
                <Text>Save</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

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
  },
  picker: {
    paddingBottom: 0,
    marginBottom: 0,
    alignItems: "flex-end",
    paddingLeft: 0
  }
};
