import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  Image, 
  Animated, 
  PanResponder,
  TouchableOpacity
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const Users = [
  { id: "1", uri: require('../assets/1.jpg'), name: '1' },
  { id: "2", uri: require('../assets/2.jpg'), name: '2' },
  { id: "3", uri: require('../assets/3.jpg'), name: '3' },
  { id: "4", uri: require('../assets/4.jpg'), name: '4' },
  { id: "5", uri: require('../assets/5.jpg'), name: '5' },
]

//export default class Swipe extends React.Component {
export default function Swipe() {

  let panResponder = generatePanRespond()
  let position = new Animated.ValueXY()
  let rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })
  let rotateAndTranslate = {
    transform: [{rotate: rotate},
    ...position.getTranslateTransform()
    ]
  }
  likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })
  dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  })

  nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  })
  nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [confirmed, setConfirmed] = useState([])

    
  function generatePanRespond () {
    return PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          confirmEvent()
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            setCurrentIndex(currentIndex + 1)
            position.setValue({ x: 0, y: 0 }) 
          })
        }
        else if (gestureState.dx < -120) {
          cancelEvent()
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            setCurrentIndex(currentIndex + 1)
            position.setValue({ x: 0, y: 0 })
          })
        }
        else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  const renderUsers = () => {
    return Users.map((item, i) => {
      if (i < currentIndex) {
        return null
      }
      else if (i == currentIndex) {

        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id} style={[rotateAndTranslate, styles.animatedView]}>
            <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

            </Animated.View>

            <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />

          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: nextCardOpacity,
              transform: [{ scale: nextCardScale }],
              height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />

          </Animated.View>
        )
      }
    }).reverse()
  }

  const confirmEvent = () => {
    let newArray = [...confirmed]
    newArray.concat(Users[currentIndex])
    setConfirmed(newArray)
  }

  const cancelEvent = () => {
    alert('no')
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }}>

      </View>
      <View style={{ flex: 1 }}>
        {renderUsers()}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText} onPress={cancelEvent}>NOPE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={confirmEvent}>
          <Text style={styles.btnText}>YES</Text>
        </TouchableOpacity>
      </View>


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: { 
    //height: SCREEN_HEIGHT - 120,
    height: SCREEN_HEIGHT / 2,
    width: SCREEN_WIDTH, 
    padding: 10, 
    position: 'absolute' 
  },
  footer: { 
    flex: 1,
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 2,
    justifyContent: 'center'
  },
  button: {
    width: "50%",
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#000'
  }
});