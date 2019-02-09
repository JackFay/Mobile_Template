import { Constants, Location, Permissions } from "expo";

export default class CurrentLocation {
  static _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    return await Location.getCurrentPositionAsync({});
  };

  static _getAddressAsync = async location => {
    return await Location.reverseGeocodeAsync(location);
  };
}
