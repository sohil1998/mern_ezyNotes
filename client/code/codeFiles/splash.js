import Lottie from "lottie-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";
import JSONS from "../custom/styles/assetsStyles/jsonFiles";
import COLORS from "../custom/styles/codeStyles/colors";
import * as SecureStore from "expo-secure-store";

const Splash = (props) => {
  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      setTimeout(() => {
        props.navigation.replace("Tabs");
      }, 2000);
    } else {
      setTimeout(() => {
        props.navigation.replace("login");
      }, 2000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Lottie
        source={JSONS.splashAnimation}
        autoPlay
        loop
        style={{ backgroundColor: COLORS.appColor1, flex: 1 }}
      />
    </View>
  );
};
export default Splash;
