import React, { Component } from "react";
import {
  Card,
  CardItem,
  Icon,
  Right,
  Container,
  Content,
  Label,
  List,
  ListItem,
  Text,
  Item,
  Input
} from "native-base";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

@connect(store => {
  return {};
})
export default class SearchBox extends Component {
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
            key => key.value.toLowerCase().slice(0, inputLength) === inputValue
          );

    this.setState({
      suggestions: newSuggestions
    });
  }

  itemPressed(item) {
    Keyboard.dismiss();
    this.props.itemPressed(item);
    this.setState({ selectedValue: item, suggestions: [] });
  }

  render() {
    var items = this.state.suggestions;
    let selectedValue = this.state.selectedValue
      ? this.state.selectedValue.value
      : this.state.value;
    return (
      <View>
        <View>
          <TextInput
            style={{ height: 50, fontSize: 40 }}
            onChangeText={this.onChange.bind(this)}
            value={this.props.readOnlyValue || selectedValue}
            placeholder={this.props.placeholder}
            editable={this.props.readOnly ? false : true}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <List
            dataArray={items}
            keyboardShouldPersistTaps={"handled"}
            renderRow={item => (
              <CardItem style={{ marginLeft: 0, paddingLeft: 0 }}>
                <TouchableOpacity
                  style={{ width: "100%" }}
                  onPress={() => this.itemPressed(item)}
                >
                  <Text>{item.value}</Text>
                </TouchableOpacity>
              </CardItem>
            )}
          />
        </View>
      </View>
    );
  }
}
