import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

const Home = (props) => {
  const [showDelete, setshowDelete] = useState(false);
  const [dataToDelete, setdataToDelete] = useState([]);

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
            : props.navigation.navigate("details");
        }}
        style={[
          ViewStyle.borderView,
          ViewStyle.spaceBtwn,
          { backgroundColor: COLORS.black },
        ]}
      >
        <Text style={TextStyle.titleTextStyle1}>Hiiiii</Text>
        <Text style={TextStyle.textStyle2}>Sept 11 2022 10:30 pm</Text>
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
        data={[...Array(20).keys()]}
        renderItem={(item, index) => renderView(item, index)}
        animationType={AnimationType.SlideFromRight}
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
    </SafeAreaView>
  );
};

export default Home;
