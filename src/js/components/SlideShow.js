import React from "react";
import { Root } from "native-base";
import { ScrollView, Text, View } from "react-native";

export default class SlideShowComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ScrollView horizontal={true} pagingEnabled={true}>
        <View
          style={{
            backgroundColor: "#5f9ea0",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: this.props.width
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              textAlign: "center"
            }}
          >
            Photo 1
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#5f9ea0",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: this.props.height,
            width: this.props.width
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              textAlign: "center"
            }}
          >
            Photo 2
          </Text>
        </View>
      </ScrollView>
    );
  }
}
