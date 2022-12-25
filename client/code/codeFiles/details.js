import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonStyle from "../custom/styles/codeStyles/buttonStyles";
import MarginPadding from "../custom/styles/codeStyles/marginPadding";
import TextStyle from "../custom/styles/codeStyles/textStyles";
import ViewStyle from "../custom/styles/codeStyles/viewStyles";
import COLORS from "../custom/styles/codeStyles/colors";
import {
  Entypo,
  MaterialCommunityIcons,
} from "../custom/styles/assetsStyles/icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import URLS from "../custom/customCodeFiles/apiUrls";
import axios from "axios";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const Details = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isContentChange, setIsContentChange] = useState(false);
  const [userId, setUserId] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteId, setNoteId] = useState("");

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const id = await SecureStore.getItemAsync("id");
    setNoteId(props.route.params?.noteId);
    setUserId(id);
    getNoteContent(props.route.params?.noteId);
  };

  const getNoteContent = async (id) => {
    const data = JSON.stringify({
      noteId: id,
    });

    const config = {
      method: "post",
      url: `${URLS.getNoteById}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("getNoteById_config", config);
    axios(config)
      .then(async function (response) {
        console.log("getNoteById_Resp", response.data);
        const responseData = response.data;
        setNoteContent(responseData.data[0]);
      })
      .catch(function (error) {
        console.log("getNoteById_error", error);
      });
  };

  const goBack = () => {
    let data = "";
    if (noteId) {
      data = JSON.stringify({
        title: title,
        content: content,
        updateDate: new Date(),
        noteId: noteId,
      });
    } else {
      data = JSON.stringify({
        title: title,
        content: content,
        updateDate: new Date(),
        userId: userId,
      });
    }

    const config = {
      method: "post",
      url: noteId ? `${URLS.updateNoteById}` : `${URLS.createNote}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("createNoteUpdate_body", config.data);
    axios(config)
      .then(async function (response) {
        console.log("createNoteUpdate_resp", response.data);
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
          props.navigation.goBack();
        }
      })
      .catch(function (error) {
        console.log("createNoteUpdate_error", error);
        props.navigation.goBack();
      });
  };

  return (
    <SafeAreaView style={ViewStyle.rootSafeAreaView}>
      <View style={[ViewStyle.spaceBtwn, ViewStyle.borderBottom]}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={COLORS.grey}
          style={[
            ViewStyle.inputStyle,
            TextStyle.titleTextStyle,
            { height: hp("5%"), width: wp("70%") },
          ]}
          selectionColor={COLORS.appColor1}
          defaultValue={noteContent?.title}
          onChangeText={(e) => {
            setTitle(e);
            setIsContentChange(true);
          }}
        />
        <MaterialCommunityIcons
          name="delete"
          size={wp("8%")}
          color={COLORS.appColor2}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[MarginPadding.marginTop, MarginPadding.marginBottom]}
      >
        <TextInput
          multiline={true}
          placeholder="Type Here"
          placeholderTextColor={COLORS.grey}
          style={[ViewStyle.inputStyle, TextStyle.textStyle4]}
          selectionColor={COLORS.appColor1}
          defaultValue={noteContent?.content}
          onChangeText={(e) => {
            setContent(e);
            setIsContentChange(true);
          }}
        />
      </ScrollView>
      <View style={[ViewStyle.positionBottom, ViewStyle.spaceBtwn]}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={[ButtonStyle.shortButtonStyle]}
        >
          <Text style={TextStyle.textStyle3}>
            {isContentChange ? "Save" : "Back"}
          </Text>
        </TouchableOpacity>
        <View style={MarginPadding.marginHorizontal}>
          <Text style={TextStyle.textStyle2}>
            Last Modified : {noteContent?.updateDate}
          </Text>
          <Text style={TextStyle.textStyle2}>
            Creation Date : {noteContent?.updateDate}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;
