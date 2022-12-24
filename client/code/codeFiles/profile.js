import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import ButtonStyle from "../custom/styles/codeStyles/buttonStyles";
import COLORS from "../custom/styles/codeStyles/colors";
import MarginPadding from "../custom/styles/codeStyles/marginPadding";
import TextStyle from "../custom/styles/codeStyles/textStyles";
import * as SecureStore from "expo-secure-store";
import ViewStyle from "../custom/styles/codeStyles/viewStyles";
import axios from "axios";
import URLS from "../custom/customCodeFiles/apiUrls";
import modalStyle from "../custom/styles/codeStyles/modalStyle";
import ModalScreen from "../custom/customCodeFiles/modal";
import AppContext from "../custom/context/appContext";

const Profile = (props) => {
  const [userData, setuserData] = useState("");
  const [showModal, setshowModal] = useState(false);

  //context
  const { colorTheme, setcolorTheme } = useContext(AppContext);

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const id = await SecureStore.getItemAsync("id");
    console.log("user_id", id);
    getUserDataById(id);
  };

  const getUserDataById = async (id) => {
    const config = {
      method: "post",
      url: `${URLS.users}/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("getUserDataById_config", config.url);
    axios(config)
      .then(async function (response) {
        console.log("getUserDataById_Resp", response.data);
        const responseData = response.data;
        if (responseData.status == 0) {
        } else {
          setuserData(responseData.data);
        }
      })
      .catch(function (error) {
        console.log("getUserDataById_error", error);
      });
  };

  const deleteAccount = () => {
    console.log("hiii");
  };

  return (
    <SafeAreaView style={ViewStyle.rootSafeAreaView}>
      <View style={MarginPadding.marginTop}>
        <Text style={TextStyle.textStyle2}>Hi,</Text>
        <Text style={TextStyle.titleTextStyle}>{userData.name}</Text>

        <TouchableOpacity
          onPress={() => {
            if (colorTheme == "dark") {
              setcolorTheme("light");
            } else {
              setcolorTheme("dark");
            }
          }}
        >
          <Text>Change Theme</Text>
        </TouchableOpacity>
      </View>

      <View style={[ViewStyle.spaceBtwn, MarginPadding.marginTop]}>
        <View>
          <Text style={TextStyle.textStyle2}>Your email</Text>
          <Text style={TextStyle.titleTextStyle1}>{userData.email}</Text>
        </View>
        <View>
          <Text style={TextStyle.textStyle2}>Your mobile number</Text>
          <Text style={TextStyle.titleTextStyle1}>{userData.mobile}</Text>
        </View>
      </View>

      <View style={[MarginPadding.marginTop]}>
        <View>
          <Text style={TextStyle.textStyle2}>About Us</Text>
          <Text style={TextStyle.titleTextStyle1}>ezyNotes,</Text>
        </View>
        <View>
          <Text style={TextStyle.textStyle4}>
            Just a simple tool to share link or any notes between your pc to
            your mobile or vice versa.
          </Text>
        </View>
      </View>

      <View style={ViewStyle.positionBottom}>
        <TouchableOpacity
          onPress={async () => {
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("token");
            props.navigation.replace("login");
          }}
          style={[
            ButtonStyle.fullButtonStyle,
            MarginPadding.marginTop1,

            {
              backgroundColor: COLORS.black,
            },
          ]}
        >
          <Text style={TextStyle.titleTextStyle1}>LOGOUT 😔</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setshowModal(true)}
          style={[
            ButtonStyle.fullButtonStyle,
            MarginPadding.marginTop1,

            {
              backgroundColor: COLORS.black,
            },
          ]}
        >
          <Text
            style={[TextStyle.titleTextStyle1, { color: COLORS.appColor2 }]}
          >
            DELETE ACCOUNT 🙁
          </Text>
        </TouchableOpacity>
      </View>
      <View style={modalStyle.centeredView}>
        <ModalScreen
          showModal={showModal}
          setshowModal={setshowModal}
          deleteAccount={deleteAccount}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
