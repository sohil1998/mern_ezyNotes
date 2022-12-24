import React, { useState } from "react";
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

const Details = (props) => {
  const goBack = () => {
    props.navigation.goBack();
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
        />
      </ScrollView>
      <View style={[ViewStyle.positionBottom, ViewStyle.spaceBtwn]}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={[ButtonStyle.shortButtonStyle]}
        >
          <Text style={TextStyle.textStyle3}>Back</Text>
        </TouchableOpacity>
        <View style={MarginPadding.marginHorizontal}>
          <Text style={TextStyle.textStyle2}>
            Last Modified : Sept 23 2022 10:33 pm
          </Text>
          <Text style={TextStyle.textStyle2}>
            Creation Date : Sept 22 2022 10:33 pm
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;
