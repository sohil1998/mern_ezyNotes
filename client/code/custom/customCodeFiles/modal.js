import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import modalStyle from "../styles/codeStyles/modalStyle";
import TextStyle from "../styles/codeStyles/textStyles";
import ViewStyle from "../styles/codeStyles/viewStyles";
import Lottie from "lottie-react-native";
import JSONS from "../styles/assetsStyles/jsonFiles";

const ModalScreen = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={() => {
        props.setshowModal(!props.showModal);
      }}
    >
      <View style={modalStyle.centeredView}>
        <View style={modalStyle.modalView}>
          <Lottie
            source={JSONS.cryingAnimation}
            autoPlay
            loop
            style={{ flex: 1, marginBottom: 40 }}
          />
          <Text style={[TextStyle.titleTextStyle1]}>
            Are you sure you want to {"\n"}DELETE account ?
          </Text>

          <View style={ViewStyle.spaceBtwn}>
            <TouchableOpacity
              onPress={() => props.setshowModal(!props.showModal)}
            >
              <Text style={TextStyle.textStyle3}>Ok, Ill stay 😊</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.deleteAccount();
                props.setshowModal(!props.showModal);
              }}
            >
              <Text style={TextStyle.textStyle3}>Yes, I have to go 😢</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalScreen;
