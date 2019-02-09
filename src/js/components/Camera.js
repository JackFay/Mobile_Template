import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Button, Container, Text } from "native-base";
import { Camera, ImageManipulator, Permissions } from "expo";
import { connect } from "react-redux";

@connect(store => {
  return {
    user: store.auth,
    loggedIn: store.auth.isLoggedIn
  };
})
export default class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionsGranted: null,
      type: Camera.Constants.Type.back,
      base64_image: null,
      uri: null
    };
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === "granted" });
  }

  takePicture = async () => {
    const options = {
      quality: 0.5,
      base64: true
    };
    if (this.camera) {
      console.log("Image captured");
      let photo = await this.camera.takePictureAsync();
      const manipResult = await ImageManipulator.manipulate(photo.uri, [], {
        compress: 0
      });
      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.onPictureTaken
      ) {
        this.props.navigation.state.params.onPictureTaken(manipResult.uri);
      }
      this.props.navigation.pop();
    } else {
      console.log("Camera not available...");
    }
  };

  render() {
    const { permissionsGranted } = this.state;
    if (permissionsGranted === null) {
      return <View />;
    } else if (permissionsGranted === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Container style={styles.container}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center"
              }}
              onPress={this.takePicture}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                  color: "white",
                  marginBottom: 20
                }}
              >
                Take Picture
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#f8f9fa"
  }
};
