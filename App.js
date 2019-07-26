import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image
} from "react-native";

const DRAWER_WIDTH = 300;
import Swipe from './src/components/Swipe'
import Drawer from './src/components/Drawer'

export default class App extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.state = {
      disabled: false
    };
    this.toogleFlag = 0;
  }

  toggleDrawer = () => {
    if (this.toogleFlag === 0) {
      this.setState({ disabled: true }, () => {
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: 250
        }).start(() => {
          this.setState({ disabled: false });
          this.toogleFlag = 1;
        });
      });
    } else {
      this.setState({ disabled: true }, () => {
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 250
        }).start(() => {
          this.setState({ disabled: false });
          this.toogleFlag = 0;
        });
      });
    }
  };

  render() {
    const animatedValue = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [DRAWER_WIDTH - 46, 0]
    });

    return (
      <View style={styles.container}>
        <Swipe />
        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: animatedValue }] }
          ]}
        >
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={this.toggleDrawer}
            style={{ padding: 8 }}
          >
            <Image
              source={require("./src/assets/hamburger.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <View style={styles.drawerContainer}>
            {/*<Text style={styles.text}>Your Content goes here...</Text>*/}
            <Drawer />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center"
  },

  demoText: {
    fontSize: 20,
    textAlign: "center",
    color: "black"
  },

  drawer: {
    position: "absolute",
    top: Platform.OS == "ios" ? 20 : 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    flexDirection: "row"
  },

  drawerContainer: {
    flex: 1,
    backgroundColor: "rgb(57, 73, 171)",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    fontSize: 25,
    color: "white",
    textAlign: "center"
  }
});
