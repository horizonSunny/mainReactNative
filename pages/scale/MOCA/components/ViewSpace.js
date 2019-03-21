import React, { Component } from "react";
import {
  View,
  Text,
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

export default class ViewSpace extends Component {
  constructor(props) {
    super(props);
    let answerModel = {
      score: 0,
      answer: ""
    };
    this.state = {
      questionModel: "directiveForce",
      questionIndex: this.props.directionForward ? 9 : 0,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      ligature: objectClone(answerModel),
      cube: objectClone(answerModel),
      horologe: objectClone(answerModel)
    };
    if (this.props.questionModel["questionInfo"] === "") {
      this.setState({ questionInfo: questionInfo });
    } else {
      this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    }
  }
  // 调用keyboard回调的方法
  keyBoardChange = (key, value) => {
    // console.log('key_'+ key +'_answer_'+value);
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
  };
  // 该模块上一个问题
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
    // 判断是否为空，为空则return
    const questionType = questionTotal[this.state.questionIndex];
    if (this.state.questionInfo[questionType]["answer"] === "") {
      androidToast("请选择选项");
      return;
    }
    // 表示是否全部问题, 是否全部结束了
    if (this.state.questionIndex === questionTotal.length - 1) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  calculateScore = () => {};
  render() {
    return (
      <React.Fragment>
        {this.state.questionIndex === 0 && (
          <View style={{ marginTop: dp(30) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(50),
                alignItems: "center"
              }}
            >
              <PageOrderCode
                index={this.state.questionIndex + 1}
                indexTotal={19}
              />
              <View
                style={{
                  width: dp(800),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  1-1.请您按照1甲2乙3丙4丁5戊的顺序连线
                </Text>
              </View>
              <View style={{ justifyContent: "center" }} />
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(60)
              }}
            >
              <KeyBoardNumber
                onEnsure={this.goNext.bind(this, "thisYear")}
                onChangeText={this.keyBoardChange.bind(this, "thisYear")}
                scu={false}
              />
            </View>
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </View>
        )}
        {this.state.questionIndex === 1}&&
        <View />
        {this.state.questionIndex === 2}&&
        <View />
      </React.Fragment>
    );
  }
}
