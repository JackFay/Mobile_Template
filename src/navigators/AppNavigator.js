import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Camera from "../js/components/Camera";
import ChatRoom from "../js/components/ChatRoom";
import Home from "../js/pages/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "../js/pages/Login";
import Map from "../js/pages/Map";
import Messages from "../js/pages/Messages";
import Profile from "../js/pages/Profile";
import Register from "../js/pages/Register";
import Settings from "../js/pages/Settings";
import VerifyAccount from "../js/pages/VerifyAccount";

const HomeTabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
      tabBarLabel: "Home",
      tabBarVisible: false,
      headerLeft: null,
      tabBarIcon: () => {
        <Ionicons name={"ios-home"} size={26} style={{ color: "blue" }} />;
      }
    }
  }
});

const LoginTabs = createBottomTabNavigator(
  {
    Login,
    Register
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 18
      }
    }
  }
);

const appStack = createStackNavigator({
  Home: {
    screen: HomeTabs,
    navigationOptions: {
      header: null,
      footer: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile",
      footer: null
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: "Settings"
    }
  },
  Map: {
    screen: Map,
    navigationOptions: {
      header: null,
      footer: null
    }
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      header: null
    }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      title: "Messages"
    }
  },
  ChatRoom: {
    screen: ChatRoom,
    navigationOptions: {
      header: null
    }
  }
});

const authStack = createStackNavigator({
  Login: {
    screen: LoginTabs,
    navigationOptions: {
      header: null
    }
  },
  VerifyAccount: {
    screen: VerifyAccount,
    navigationOptions: {
      title: "Verify Account"
    }
  }
});

const navigator = createSwitchNavigator(
  {
    Auth: authStack,
    App: appStack
  },
  {
    initialRouteName: "App"
  }
);

export default navigator;
