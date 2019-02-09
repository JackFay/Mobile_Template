import React from "react";
import { Drawer, Button, Icon } from "native-base";
import {
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  Text,
  View
} from "react-native";
import { MapView, Marker } from "expo";
import SideBar from "../components/SideBar";
import SlidingUpPanel from "../components/SlidingUpPanel";
import SlideShow from "../components/SlideShow";
import Location from "../components/lib/CurrentLocation";
import SpotDetails from "../components/SpotDetails";

const { height, width } = Dimensions.get("window");
const PHOTO_VIEW_HEIGHT = 300;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "space-between"
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    height: PHOTO_VIEW_HEIGHT
  },
  panelHeader: {
    flex: 1,
    backgroundColor: "#b197fc",
    alignItems: "center",
    justifyContent: "center"
  },
  favoriteIcon: {
    position: "absolute",
    top: -24,
    right: 24,
    backgroundColor: "#2b8a3e",
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    margin: 2,
    borderColor: "#2a4944",
    borderWidth: 1,
    backgroundColor: "#d2f7f1"
  },
  footer: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  reserveButton: {
    width: "50%",
    height: "100%"
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 30,
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "#e4e2e2",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  menuIcon: {
    // fontSize: 45,
    // color: "black",
    // fontWeight: 900
  }
};
import { connect } from "react-redux";
@connect(store => {
  return {};
})
export default class Home extends React.Component {
  _draggedValue = new Animated.Value(-120);

  constructor(props) {
    super(props);
    this.state = {
      testCoordinate: {
        latitude: 37.78825,
        longitude: -122.4324
      },
      currentLocation: null,
      currentAddress: null,
      markerClicked: false,
      visible: true,
      draggableRange: {
        top: height,
        bottom: 0
      },
      valueY: 0,
      slidingPannelVisible: false,
      names: [
        { name: "Ben", id: 1 },
        { name: "Susan", id: 2 },
        { name: "Robert", id: 3 },
        { name: "Mary", id: 4 },
        { name: "Daniel", id: 5 },
        { name: "Laura", id: 6 },
        { name: "John", id: 7 },
        { name: "Debra", id: 8 },
        { name: "Aron", id: 9 },
        { name: "Ann", id: 10 },
        { name: "Steve", id: 11 },
        { name: "Olivia", id: 12 }
      ],
      allowDragging: true,
      isAtTop: false
    };
    this.setSliderToTop = this.setSliderToTop.bind(this);
  }

  async componentDidMount() {
    const { coords } = await Location._getLocationAsync();
    const address = await Location._getAddressAsync({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    await this.setState({
      currentLocation: coords,
      currentAddress: address
    });
  }

  onSpotSelect = () => {
    this.setState({ slidingPannelVisible: true, isAtTop: false });
    this._panel.transitionTo(PHOTO_VIEW_HEIGHT);
  };

  setSliderToTop(value) {
    this.setState({ isAtTop: value });
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const { top, bottom } = this.state.draggableRange;
    const transformOpacity = this._draggedValue.interpolate({
      inputRange: [0, 240],
      outputRange: [1, 0]
    });
    const slidingPosition = this.state.slidingPannelVisible
      ? { position: "absolute", zIndex: -1 }
      : null;

    const slideshow = (
      <View style={{ height: PHOTO_VIEW_HEIGHT }}>
        <SlideShow style={styles.panelHeader} width={width} />
      </View>
    );
    let currentLocationLatLong = null;

    if (this.state.currentLocation) {
      currentLocationLatLong = {
        latitude: this.state.currentLocation.latitude,
        longitude: this.state.currentLocation.longitude
      };
    }
    return (
      <View style={styles.container}>
        <SlidingUpPanel
          visible={this.state.visible}
          startCollapsed
          showBackdrop={true}
          ref={c => (this._panel = c)}
          draggableRange={this.state.draggableRange}
          onDrag={v => this._draggedValue.setValue(v)}
          style={{}}
          allowDragging={this.state.allowDragging}
          photoViewHeight={PHOTO_VIEW_HEIGHT}
          setSliderToTop={this.setSliderToTop}
        >
          <View style={styles.panel}>
            {this.state.isAtTop ? null : slideshow}
            <ScrollView>
              {this.state.isAtTop ? slideshow : null}
              <Icon
                onPress={this.onSpotSelect}
                type="EvilIcons"
                name="close"
                style={{
                  position: "absolute",
                  top: 50,
                  left: "90%",
                  right: 0,
                  bottom: 0
                }}
              />
              <ScrollView
                onTouchEnd={() => this.setState({ allowDragging: true })}
                onTouchCancel={() => this.setState({ allowDragging: true })}
                onTouchStart={() => this.setState({ allowDragging: false })}
              >
                <SpotDetails />
              </ScrollView>
            </ScrollView>
            <View style={styles.footer}>
              <Button full style={styles.reserveButton}>
                <Text>Book Now</Text>
              </Button>
              <Button
                full
                light
                style={styles.reserveButton}
                onPress={() => this.openDrawer()}
              >
                <Text>Reserve</Text>
              </Button>
            </View>
          </View>
        </SlidingUpPanel>
        <View style={[slidingPosition, { width: "100%", height: "100%" }]}>
          <Button
            rounded
            style={styles.menuButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon
              name="arrow-back"
              type="MaterialIcons"
              style={styles.menuIcon}
            />
          </Button>
          {!this.state.currentLocation ? (
            <Text style={{ marginTop: 200, marginLeft: 200 }}>Loading...</Text>
          ) : (
            <MapView
              initialRegion={{
                latitude: currentLocationLatLong.latitude,
                longitude: currentLocationLatLong.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              style={{ height: "100%" }}
            >
              <MapView.Marker
                coordinate={currentLocationLatLong}
                onPress={this.onSpotSelect}
              />
            </MapView>
          )}
        </View>
      </View>
    );
  }
}
