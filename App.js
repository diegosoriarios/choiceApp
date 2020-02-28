import React from "react";
import {
  View,
  Platform,
  Animated,
  StyleSheet,
} from "react-native";

const DRAWER_WIDTH = 300;
import Swipe from './src/components/Swipe'

export default function App() {
  let animatedValue = new Animated.Value(0)

  const animated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH - 46, 0]
  })

  return (
    <View style={styles.container}>
      <Swipe />
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: animated }] }
        ]}
      >
      </Animated.View>
    </View>
  );
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
