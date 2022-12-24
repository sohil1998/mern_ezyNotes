import { StyleSheet } from "react-native";
import COLORS from "./colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const TextStyle = StyleSheet.create({
  textStyle2: {
    color: COLORS.grey,
    fontSize: wp("4%"),
    fontFamily: "fontRegular",
  },
  textStyle3: {
    color: COLORS.black,
    fontSize: wp("5%"),
    fontFamily: "fontBold",
  },
  textStyle4: {
    color: COLORS.white,
    fontSize: wp("5.5%"),
    fontFamily: "fontRegular",
  },
  titleTextStyle: {
    fontSize: wp("8%"),
    fontFamily: "fontBold",
    color: COLORS.appColor1,
  },
  titleTextStyle1: {
    fontSize: wp("5%"),
    fontFamily: "fontBold",
    color: COLORS.appColor1,
  },
});

export default TextStyle;
