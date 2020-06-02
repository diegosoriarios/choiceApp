/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    //height: SCREEN_HEIGHT - 120,
    padding: 10,
    position: "absolute",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: "50%",
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    color: "#000",
  },
});

export default styles;
