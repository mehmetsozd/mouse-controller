import React, { createContext, useEffect, useRef, useState } from "react";
import WebSocket from "isomorphic-ws";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState("no connection");
  const channelRef = useRef(null);

  const connectToWS = () => {
    setConnectionStatus("connecting...");
    try {
      const ws = new WebSocket("ws://192.168.1.15:8080/ws");
      ws.onopen = () => {
        setConnectionStatus("Connected");
        channelRef.current = ws;
      };
      ws.onmessage = (event) => {
        console.log(event.data);
      };
      ws.onerror = (error) => {
        console.log("connection failed", error);
        setConnectionStatus("connection failed");
        channelRef.current = null;
      };
      ws.onclose = () => {
        setConnectionStatus("connection closed");
        channelRef.current = null;
      };
    } catch (error) {
      console.log("connection failed", error);
      setConnectionStatus("connection failed");
    }
  };

  const sendMessage = (data) => {
    if (channelRef.current) {
      channelRef.current.send(JSON.stringify(data));
    }
  };

  useEffect(() => {
    connectToWS();
    return () => {
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ connectionStatus, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
