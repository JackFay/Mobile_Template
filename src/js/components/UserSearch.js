import React, { Component } from "react";
import {
  Body,
  Card,
  CardItem,
  Icon,
  Container,
  Content,
  Label,
  Left,
  List,
  ListItem,
  Text,
  Item,
  Input,
  Right
} from "native-base";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: props.data || [],
      suggestions: [],
      selectedValue: null
    };

    this.itemPressed = this.itemPressed.bind(this);
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  onChange(value) {
    if (value === "") {
      this.props.searchCleared();
    }
    this.state.value = value;
    if (!this.state.selectedValue) {
      this.updateSuggestions(value);
    } else {
      this.setState({ selectedValue: null });
    }
  }

  updateSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let newSuggestions =
      inputLength === 0
        ? []
        : this.state.data.filter(
            user =>
              user.name
                .trim()
                .toLowerCase()
                .slice(0, inputLength) === inputValue
          );

    this.setState({
      suggestions: newSuggestions
    });
  }

  itemPressed(item) {
    Keyboard.dismiss();
    this.props.itemPressed(item, true);
    this.setState({ selectedValue: item, suggestions: [] });
  }

  render() {
    const items = this.state.suggestions.map((user, index) => {
      return (
        <ListItem avatar key={index} onPress={() => this.itemPressed(user)}>
          <Left>
            <Icon name="md-person" />
          </Left>
          <Body>
            <Text>
              {user.name}
              {user.credential ? `, ${user.credential}` : null}
            </Text>
            <Text note>
              {user.location} - {user.careCategory}
            </Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
    let selectedValue = this.state.selectedValue
      ? this.state.selectedValue.value
      : this.state.value;
    return (
      <View>
        <View>
          <TextInput
            style={{ height: 50, fontSize: 40, marginTop: 30 }}
            onChangeText={this.onChange.bind(this)}
            value={this.props.readOnlyValue || selectedValue}
            placeholder={this.props.placeholder}
            editable={this.props.readOnly ? false : true}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <List>{items}</List>
        </View>
      </View>
    );
  }
}
