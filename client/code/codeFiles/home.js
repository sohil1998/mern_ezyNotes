import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextStyle from "../custom/styles/codeStyles/textStyles";
import ViewStyle from "../custom/styles/codeStyles/viewStyles";
import { AnimatedFlatList, AnimationType } from "flatlist-intro-animations";
import {
  AntDesign,
  MaterialCommunityIcons,
} from "../custom/styles/assetsStyles/icons";
import ButtonStyle from "../custom/styles/codeStyles/buttonStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import COLORS from "../custom/styles/codeStyles/colors";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import URLS from "../custom/customCodeFiles/apiUrls";

const Home = (props) => {
  const [showDelete, setshowDelete] = useState(false);
  const [dataToDelete, setdataToDelete] = useState([]);
  const [userId, setUserId] = useState("");
  const [notesData, setNotesData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const id = await SecureStore.getItemAsync("id");
    setUserId(id);
    getUserNotes(id);
  };

  const getUserNotes = async (id) => {
    const data = JSON.stringify({
      userId: id || userId,
    });

    const config = {
      method: "post",
      url: `${URLS.getNotes}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("getUserNotes_config", config);
    axios(config)
      .then(async function (response) {
        console.log("getUserNotes_Resp", response.data);
        const responseData = response.data;
        setNotesData(responseData?.data);
      })
      .catch(function (error) {
        console.log("getUserNotes_error", error);
      });
  };

  const longPressFunc = () => {
    setshowDelete(true);
  };

  const setData = (isInclude, index) => {
    if (isInclude) {
      const filteredData = dataToDelete.filter((i) => i != index);
      setdataToDelete(filteredData);
    } else {
      setdataToDelete([...dataToDelete, index]);
    }
  };

  const renderView = ({ item, index }) => {
    const isInclude = dataToDelete.includes(index);
    return (
      <TouchableOpacity
        onLongPress={() => longPressFunc()}
        onPress={() => {
          showDelete
            ? setData(isInclude, index)
            : props.navigation.navigate("details", {
                noteId: item._id,
              });
        }}
        style={[
          ViewStyle.borderView,
          ViewStyle.spaceBtwn,
          { backgroundColor: COLORS.black },
        ]}
      >
        <Text style={TextStyle.titleTextStyle1}>{item.title}</Text>
        <Text style={TextStyle.textStyle2}>{item.updateDate}</Text>
        {showDelete ? (
          <TouchableOpacity
            onPress={() => {
              setData(isInclude, index);
            }}
          >
            {isInclude ? (
              <MaterialCommunityIcons
                name="checkbox-intermediate"
                size={wp("8%")}
                color={COLORS.appColor2}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={wp("8%")}
                color={COLORS.appColor3}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={ViewStyle.rootSafeAreaView}>
      {showDelete ? (
        <TouchableOpacity
          onPress={() => setshowDelete(false)}
          style={[ViewStyle.positionTopLeft]}
        >
          <MaterialCommunityIcons
            name="close-box"
            size={wp("8%")}
            color={COLORS.appColor1}
          />
        </TouchableOpacity>
      ) : null}
      <AnimatedFlatList
        data={notesData}
        renderItem={(item, index) => renderView(item, index)}
        animationType={AnimationType.SlideFromRight}
        onRefresh={() => getUserNotes()}
        refreshing={isloading}
        //animation types
        //SlideFromRight
        //SlideFromBottom
        //Fade
        //Rotate
        //Dive
        contentContainerStyle={{ paddingBottom: hp("20%") }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        animationDuration={5000}
      />
      {showDelete ? (
        <View style={[ViewStyle.positionBottom, ViewStyle.spaceBtwn]}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={[
              ButtonStyle.fullButtonStyle,
              { backgroundColor: COLORS.appColor2 },
            ]}
          >
            <Text style={[TextStyle.textStyle3]}>
              {dataToDelete.length == 0
                ? `DELETE ALL`
                : `DELETE SELECTED ${dataToDelete.length}`}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("details")}
          style={[ViewStyle.positionBottomLeft, ViewStyle.circle]}
        >
          <AntDesign name="addfile" size={wp("5%")} color={COLORS.black} />
        </TouchableOpacity>
      )}
      {isloading && <ActivityIndicator />}
    </SafeAreaView>
  );
};

export default Home;
