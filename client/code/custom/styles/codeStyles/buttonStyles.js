import { StyleSheet } from "react-native";
import COLORS from "./colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ButtonStyle = StyleSheet.create({
  shortButtonStyle: {
    width: wp("20%"),
    backgroundColor: COLORS.appColor1,
    alignItems: "center",
    padding: wp("3%"),
    borderRadius: wp("2%"),
  },
  fullButtonStyle: {
    width: wp("90%"),
    backgroundColor: COLORS.appColor1,
    alignItems: "center",
    padding: wp("4%"),
    borderRadius: wp("2%"),
  },
});

export default ButtonStyle;
