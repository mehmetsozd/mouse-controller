import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TopNavigator from "./src/navigations/TopNavigator";
import { WebSocketProvider } from "./src/context/WebSocketProvider";

function App(): React.JSX.Element {
  return (
    <WebSocketProvider>
      <NavigationContainer>
        <TopNavigator />
      </NavigationContainer>
    </WebSocketProvider>
  );
}

export default App;
