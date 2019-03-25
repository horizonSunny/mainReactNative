import React, { Component } from "react";
import {
  View,
  Text,
  ART,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import Canvas from "../../../../components/Canvas/Canvas";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import { objectClone } from "../../../../utils/objectClone";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import DoctorHelpConfirm from "../../../PageComponent/DoctorHelpConfirm/DoctorHelpConfirm";
import styles from "../../../../../assets/css/common";
import { DrawNumberCircle } from "../../../../utils/drawNumberCircle";
import ligatureCoordinate from "./ViewSpaceComponent/ligatureCoordinate";
import AnswerConfirm from "./ViewSpaceComponent/AnswerConfirm";

export default class Named extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      lion: objectClone(answerModel),
      rhinoceros: objectClone(answerModel),
      camel: objectClone(answerModel)
    };
    if (this.props.questionModel["questionInfo"] === "") {
      this.setState({ questionInfo: questionInfo });
    } else {
      this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    }
  }

  goPrev = () => {
    if (this.state.questionIndex === 0) {
      commonFunction.jumpWithParameter("forward", this.state, this.props);
      return;
    }
    this.setState({
      questionIndex: --this.state.questionIndex
    });
  };
  goNext = () => {
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    // 表示是否全部问题, 是否全部结束了
    if (this.state.questionIndex === questionTotal.length - 1) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  render() {
    return (
      <DoctorHelpConfirm
        question={"现在您在哪个省哪个市?"}
        questionType={"lion"}
        indexTotal={19}
        questionInfo={this.state.questionInfo}
        questionIndex={this.state.questionIndex}
        keyBoardChange={this.keyBoardChange}
        goPrev={this.goPrev}
        goNext={this.goNext}
      >
        <View style={{ width: dp(1000), height: dp(500) }}>
          <Img
            source={require("../img/doctor1.png")}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(240,240,240)",
              resizeMode: "cover"
            }}
          />
        </View>
      </DoctorHelpConfirm>
    );
  }
}
