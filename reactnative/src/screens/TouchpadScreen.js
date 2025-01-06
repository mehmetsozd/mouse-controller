import { StyleSheet, Text, View, PanResponder } from "react-native";
import React, { useRef, useEffect, useContext } from "react";
import { WebSocketContext } from "../context/WebSocketProvider";

const TouchpadScreen = () => {
  const { sendMessage } = useContext(WebSocketContext);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx, dy } = gestureState;
        sendTouchpadMovement(dx, dy);
      },
    })
  ).current;

  const sendTouchpadMovement = (dx, dy) => {
    const data = {
      event: "MouseMotionMove",
      axis: { x: dx, y: dy },
    };
    sendMessage(data);
  };

  useEffect(() => {
    sendMessage({ event: "MouseMotionStart" });

    return () => {
      sendMessage({ event: "MouseMotionStop" });
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.touchpadArea} {...panResponder.panHandlers}>
        <Text style={styles.touchpadText}>Touch and Move</Text>
      </View>
    </View>
  );
};

export default TouchpadScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  touchpadArea: {
    backgroundColor: "#f0f0f0",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 20,
  },
  touchpadText: {
    fontSize: 20,
    color: "#333",
    transform: [{ rotate: "90deg" }],
  },
});
