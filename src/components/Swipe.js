/* eslint-disable no-alert */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  NativeModules,
  Platform,
  PermissionsAndroid,
} from "react-native";
import styles from "./style";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const Users = [
  {
    id: "1",
    uri: require("../assets/1.jpg"),
    name: "1",
    date: "June 22,2020 11:20:00",
  },
  {
    id: "2",
    uri: require("../assets/2.jpg"),
    name: "2",
    date: "June 23,2020 11:20:00",
  },
  {
    id: "3",
    uri: require("../assets/3.jpg"),
    name: "3",
    date: "June 24,2020 11:20:00",
  },
  {
    id: "4",
    uri: require("../assets/4.jpg"),
    name: "4",
    date: "June 25,2020 11:20:00",
  },
  {
    id: "5",
    uri: require("../assets/5.jpg"),
    name: "5",
    date: "June 26,2020 11:20:00",
  },
];

//export default class Swipe extends React.Component {
export default function Swipe() {
  let panResponder = generatePanRespond();
  let likeOpacity;
  let dislikeOpacity;
  let nextCardOpacity;
  let nextCardScale;
  let position = new Animated.ValueXY();
  let rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });
  let rotateAndTranslate = {
    transform: [{ rotate: rotate }, ...position.getTranslateTransform()],
  };
  likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });
  nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmed, setConfirmed] = useState([]);

  function generatePanRespond() {
    return PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          confirmEvent();
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          }).start(() => {
            setCurrentIndex(currentIndex + 1);
            position.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -120) {
          cancelEvent();
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          }).start(() => {
            setCurrentIndex(currentIndex + 1);
            position.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }

  const renderUsers = () => {
    return Users.map((item, i) => {
      if (i < currentIndex) {
        return null;
      } else if (i == currentIndex) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
            style={[
              rotateAndTranslate,
              styles.animatedView,
              { height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH },
            ]}
          >
            <Animated.View
              style={{
                opacity: likeOpacity,
                transform: [{ rotate: "-30deg" }],
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 1000,
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "green",
                  color: "green",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10,
                }}
              >
                YES
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: dislikeOpacity,
                transform: [{ rotate: "30deg" }],
                position: "absolute",
                top: 50,
                right: 40,
                zIndex: 1000,
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  color: "red",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10,
                }}
              >
                NOPE
              </Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20,
              }}
              source={item.uri}
            />
            <Text
              style={{
                color: "black",
                zIndex: 20,
                marginTop: 50,
                textAlign: "center",
              }}
            >
              {item.date}
            </Text>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                opacity: nextCardOpacity,
                transform: [{ scale: nextCardScale }],
                height: SCREEN_HEIGHT / 2,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute",
              },
            ]}
          >
            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: "-30deg" }],
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 1000,
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "green",
                  color: "green",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10,
                }}
              >
                YES
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: "30deg" }],
                position: "absolute",
                top: 50,
                right: 40,
                zIndex: 1000,
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  color: "red",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10,
                }}
              >
                NOPE
              </Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20,
              }}
              source={item.uri}
            />
            <Text style={{ color: "black", zIndex: 20, marginTop: -50 }}>
              {item.date}
            </Text>
          </Animated.View>
        );
      }
    }).reverse();
  };

  const confirmEvent = () => {
    let newArray = [...confirmed];
    newArray.concat(Users[currentIndex]);
    let date = new Date(Users[currentIndex].date);
    if (Platform.OS === "ios") {
      let RNCalendar = NativeModules.RNCalendar;
      RNCalendar.addEvent(
        Users[currentIndex].name,
        date.getTime(),
        4.0,
        "Rua X nº 123",
        (callback) => {
          alert(callback);
        }
      );
      //RNCalendar.findEvents((callback) => {
      //  alert(callback);
      //});
    } else {
      requestCalendarPermission()
    }
    setConfirmed(newArray);
  };

  const addEvent = () => {
    let ToastExample = NativeModules.ToastExample;
      ToastExample.show("Awesome", ToastExample.SHORT);
  }

  const requestCalendarPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR, {
          title: 'Partiu deseja acesso ao seu Calendário',
          message: "É necessário o acesso ao calendário para adicionar os eventos que você vai ir",
          buttonPositive: "Ok",
          buttonNegative: "Não"
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        addEvent()
      } else {
        alert("Erro")
      }
    } catch(e) {
      console.log(e)
    }
  }

  const cancelEvent = () => {
    alert("no");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }} />
      <View style={{ flex: 1 }}>{renderUsers()}</View>
      <View style={[styles.footer, { height: SCREEN_HEIGHT / 2 }]}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText} onPress={cancelEvent}>
            NOPE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={confirmEvent}>
          <Text style={styles.btnText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
