import React, { useState } from "react";
import axios from "axios";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import COLORS from "../custom/styles/codeStyles/colors";
import TextStyle from "../custom/styles/codeStyles/textStyles";
import ViewStyle from "../custom/styles/codeStyles/viewStyles";
import MarginPadding from "../custom/styles/codeStyles/marginPadding";
import ButtonStyle from "../custom/styles/codeStyles/buttonStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import URLS from "../custom/customCodeFiles/apiUrls";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const Login = (props) => {
  const [showSignUp, setshowSignUp] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");

  const login = async () => {
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: "post",
      url: URLS.signin,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("signin_body", config.data);
    axios(config)
      .then(async function (response) {
        console.log("signin_resp", response.data);
        const responseData = response.data;
        if (responseData.status == 0) {
          Toast.show({
            type: "error",
            text1: `🤔 ${responseData.msg}`,
          });
        } else {
          Toast.show({
            type: "success",
            text1: `🥰 ${responseData.msg}`,
          });
          await SecureStore.setItemAsync("token", responseData.token);
          await SecureStore.setItemAsync("id", responseData.data[0]._id);
          props.navigation.replace("Tabs");
        }
      })
      .catch(function (error) {
        console.log("signin_error", error);
      });
  };

  const signup = () => {
    const data = JSON.stringify({
      email: email,
      password: password,
      name: name,
      mobile: mobile,
    });

    const config = {
      method: "post",
      url: URLS.signup,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("signup_body", config.data);
    axios(config)
      .then(function (response) {
        console.log("signup_resp", response.data);
        const responseData = response.data;
        if (responseData.status == 0) {
          Toast.show({
            type: "error",
            text1: `🤔 ${responseData.msg}`,
          });
        } else {
          Toast.show({
            type: "success",
            text1: `🥰 ${responseData.msg}`,
          });
          props.navigation.replace("login");
        }
      })
      .catch(function (error) {
        console.log("signup_error", error);
      });
  };

  return (
    <SafeAreaView
      style={[
        ViewStyle.rootSafeAreaView,
        ViewStyle.center,
        { alignItems: null },
      ]}
    >
      <Text
        style={[
          TextStyle.titleTextStyle,
          MarginPadding.paddingBottom,
          { fontSize: wp("11%") },
        ]}
      >
        ezyNotes
      </Text>
      {showSignUp ? (
        <View style={ViewStyle.loginInputs}>
          <TextInput
            style={[TextStyle.textStyle4, { color: COLORS.appColor1 }]}
            placeholder="Name"
            placeholderTextColor={COLORS.grey}
            selectionColor={COLORS.appColor1}
            onChangeText={(v) => setname(v)}
          />
        </View>
      ) : null}
      <View
        style={[
          ViewStyle.loginInputs,
          showSignUp ? MarginPadding.marginTop1 : null,
        ]}
      >
        <TextInput
          style={[TextStyle.textStyle4, { color: COLORS.appColor1 }]}
          placeholder="xyz@gmail.com"
          placeholderTextColor={COLORS.grey}
          selectionColor={COLORS.appColor1}
          onChangeText={(v) => setemail(v)}
        />
      </View>

      {showSignUp ? (
        <View style={[ViewStyle.loginInputs, MarginPadding.marginTop1]}>
          <TextInput
            style={[TextStyle.textStyle4, { color: COLORS.appColor1 }]}
            placeholder="9999999999"
            placeholderTextColor={COLORS.grey}
            selectionColor={COLORS.appColor1}
            onChangeText={(v) => setmobile(v)}
          />
        </View>
      ) : null}

      <View
        style={[
          ViewStyle.loginInputs,
          MarginPadding.marginTop1,
          ViewStyle.spaceBtwn,
        ]}
      >
        <TextInput
          style={[
            TextStyle.textStyle4,
            {
              color: COLORS.appColor1,
              width: wp("70%"),
            },
          ]}
          placeholder="XXXXXX"
          placeholderTextColor={COLORS.grey}
          selectionColor={COLORS.appColor1}
          onChangeText={(v) => setpassword(v)}
          secureTextEntry={!showPass}
        />
        {showPass ? (
          <Text onPress={() => setshowPass(false)} style={TextStyle.textStyle2}>
            HIDE
          </Text>
        ) : (
          <Text onPress={() => setshowPass(true)} style={TextStyle.textStyle2}>
            SHOW
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          showSignUp ? signup() : login();
        }}
        style={[ButtonStyle.fullButtonStyle, MarginPadding.marginTop1]}
      >
        <Text style={TextStyle.textStyle3}>
          {showSignUp ? "SIGN UP" : "LOGIN"}
        </Text>
      </TouchableOpacity>
      <View style={ViewStyle.spaceBtwn}>
        <Text
          onPress={() => {
            showSignUp ? setshowSignUp(false) : setshowSignUp(true);
          }}
          style={[TextStyle.textStyle2]}
        >
          {!showSignUp
            ? "Dont have an account ? "
            : " Already have an account ? "}
          <Text style={[TextStyle.textStyle2, { color: COLORS.appColor3 }]}>
            {!showSignUp ? "Sign Up" : "Login"}
          </Text>
        </Text>
        {showSignUp ? null : (
          <Text style={[TextStyle.textStyle2]}>
            <Text style={[TextStyle.textStyle2, { color: COLORS.appColor1 }]}>
              Forgot Password ?
            </Text>
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Login;
