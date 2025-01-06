import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { gyroscope } from "react-native-sensors";
import { WebSocketContext } from "../context/WebSocketProvider";

const MouseScreen = () => {
  const [isCursorMovingEnabled, setIsCursorMovingEnabled] = useState(false);
  const gyroscopeSubscriptionRef = useRef(null);
  const { sendMessage } = useContext(WebSocketContext);

  const sendMouseMovement = (x, y, time) => {
    const seconds = (Date.now() - time) / 1000;
    const xMovement = (y * seconds * sensitivity * -1).toFixed(5);
    const yMovement = (x * seconds * sensitivity * -1).toFixed(5);

    const data = {
      event: "MouseMotionMove",
      axis: { x: xMovement, y: yMovement },
    };

    sendMessage(data);
  };

  const startGyroscopeListening = () => {
    const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
      sendMouseMovement(x, z, timestamp);
      console.log(`Gyroscope move detected at ${timestamp}`);
    });
    gyroscopeSubscriptionRef.current = subscription;
  };

  const stopGyroscopeListening = () => {
    if (gyroscopeSubscriptionRef.current) {
      gyroscopeSubscriptionRef.current.unsubscribe();
    }
  };

  const toggleCursorMovement = () => {
    setIsCursorMovingEnabled(!isCursorMovingEnabled);
    if (!isCursorMovingEnabled) {
      sendMessage({ event: "MouseMotionStart" });
      startGyroscopeListening();
    } else {
      sendMessage({ event: "MouseMotionStop" });
      stopGyroscopeListening();
    }
  };

  useEffect(() => {
    return () => {
      if (gyroscopeSubscriptionRef.current) {
        stopGyroscopeListening();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.circle,
          { backgroundColor: isCursorMovingEnabled ? "green" : "gray" },
        ]}
        onPress={toggleCursorMovement}
      >
        <Text style={styles.circleText}>
          {isCursorMovingEnabled ? "Stop" : "Start"}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => sendMessage({ event: "leftClickEvent" })}
        >
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => sendMessage({ event: "rightClickEvent" })}
        >
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MouseScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  circle: {
    alignSelf: "center",
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  circleText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: "45%",
    height: 150,
    backgroundColor: "#3498db",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
  },
});
