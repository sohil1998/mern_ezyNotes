import { StyleSheet } from "react-native";
import COLORS from "./colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ViewStyle = StyleSheet.create({
  rootSafeAreaView: {
    backgroundColor: COLORS.appColor4,
    flex: 1,
    padding: wp("5%"),
  },
  borderView: {
    padding: wp("5%"),
    borderRadius: wp("2%"),
  },
  spaceBtwn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp("1%"),
  },
  borderBottom: {
    borderBottomColor: COLORS.appColor1,
    borderBottomWidth: wp("0.2%"),
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.appColor1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  //inputs
  inputStyle: {
    width: wp("100%"),
    height: hp("100%"),
    textAlignVertical: "top",
  },
  loginInputs: {
    width: wp("90%"),
    backgroundColor: COLORS.black,
    padding: wp("4%"),
    borderRadius: wp("2%"),
  },

  //positions
  positionBottom: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  positionTopLeft: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  positionBottomLeft: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ViewStyle;
