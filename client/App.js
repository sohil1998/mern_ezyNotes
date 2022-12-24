import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./code/codeFiles/home";
import Splash from "./code/codeFiles/splash";
import Details from "./code/codeFiles/details";
import { useFonts } from "expo-font";
import Login from "./code/codeFiles/login";
import Toast from "react-native-toast-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./code/codeFiles/profile";
import { Text } from "react-native";
import TextStyle from "./code/custom/styles/codeStyles/textStyles";
import COLORS from "./code/custom/styles/codeStyles/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { AppProvider } from "./code/custom/context/appContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    fontRegular: require("./code/assets/Fonts/SourceSansPro-Regular.otf"),
    fontBold: require("./code/assets/Fonts/SourceSansPro-Semibold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Tabs" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
      <Toast />
    </>
  );
}

function StackScreens() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="details" component={Details} />
      </Stack.Navigator>
    </>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.black,
        tabBarActiveBackgroundColor: COLORS.appColor1,
        tabBarInactiveBackgroundColor: COLORS.white,
        tabBarLabelStyle: {
          color: COLORS.black,
          fontSize: wp("5%"),
          fontFamily: "fontBold",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Notes",

          tabBarIcon: ({ color, size }) => (
            <Text style={TextStyle.textStyle4}>🗒️</Text>
          ),
        }}
        name="homeTab"
        component={StackScreens}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Text style={TextStyle.textStyle4}>👤</Text>
          ),
        }}
        name="profileTab"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default App;
