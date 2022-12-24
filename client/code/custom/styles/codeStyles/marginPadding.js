import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const MarginPadding = StyleSheet.create({
  margingLeft: {
    marginLeft: wp("8%"),
  },
  marginVertical: {
    marginVertical: hp("4%"),
  },
  marginBottom: {
    marginBottom: hp("10%"),
  },
  marginTop: {
    marginTop: hp("4%"),
  },
  marginTop1: {
    marginTop: hp("2%"),
  },
  paddingBottom: {
    paddingBottom: hp("5%"),
  },
  marginHorizontal: {
    marginHorizontal: wp("4%"),
  },
});

export default MarginPadding;
