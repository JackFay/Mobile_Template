import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Content, Text, View } from "native-base";

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  spotType: {
    fontSize: 20,
    color: "#8c4229",
    marginTop: 10,
    marginLeft: 30
  },
  price: {
    fontSize: 40,
    color: "#000",
    marginTop: 10,
    marginLeft: 30
  },
  addressView: {
    marginTop: 30
  },
  addressFont: {
    fontSize: 15,
    color: "#000",
    marginTop: 10,
    marginLeft: 30
  },
  descriptionView: {
    marginTop: 10
  },
  descriptionFont: {
    fontSize: 15,
    color: "#000",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30
  },
  separator: {
    borderBottomColor: "#c3c7ca",
    borderBottomWidth: 1,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30
  }
};

export default class SpotDetails extends React.Component {
  static propTypes = {
    address: PropTypes.any,
    price: PropTypes.any
  };
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Content>
          <Text style={styles.spotType}>Rapid Strep Test</Text>
          <Text style={styles.price}>$22.00</Text>
          <View style={styles.addressView}>
            <Text style={styles.spotType}>Address</Text>
            <Text style={styles.addressFont}>4409 W 54th St</Text>
            <Text style={styles.addressFont}>Roeland Park, KS 66205</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.descriptionView}>
            <Text style={styles.spotType}>Description</Text>
            <Text style={styles.descriptionFont}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
