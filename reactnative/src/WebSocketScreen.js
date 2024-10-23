import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import WebSocket from "isomorphic-ws";
import { gyroscope } from "react-native-sensors";

const WebSocketScreen = () => {
  const [ipAddress, setIpAddress] = useState("192.168.1.15");
  const [connectionStatus, setConnectionStatus] = useState("no connection");
  const channelRef = useRef(null);
  const [sensitivity, setSensitivity] = useState(0.9);
  const [isCursorMovingEnabled, setIsCursorMovingEnabled] = useState(false);
  const gyroscopeSubscriptionRef = useRef(null);

  const connectToWS = () => {
    setConnectionStatus("connecting...");
    try {
      const ws = new WebSocket(`ws://${ipAddress}:8080/ws`);
      ws.onopen = () => {
        setConnectionStatus("Connected");
        channelRef.current = ws;
      };
      ws.onmessage = (event) => {
        console.log(event.data);
        channelRef.current.send("client received message");
      };
      ws.onerror = (error) => {
        console.log("connection failed", error);
        setConnectionStatus("connection failed", error);
        channelRef.current = null;
      };
      ws.onclose = () => {
        setConnectionStatus("connection closed");
        channelRef.current = null;
      };
    } catch (error) {
      console.log("connection failed", error);
      setConnectionStatus("connection failed", error);
    }
  };

  const sendMessage = (data) => {
    console.log("Sending message", data);
    if (channelRef.current) {
      channelRef.current.send(JSON.stringify(data));
    }
  };

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
    connectToWS();
    return () => {
      if (channelRef.current) {
        channelRef.current.close();
      }
      stopGyroscopeListening();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          value={ipAddress}
          onChangeText={setIpAddress}
          placeholder="Server IP Address"
        />

        <Text>Connection Status: {connectionStatus}</Text>
      </View>

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

export default WebSocketScreen;

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
