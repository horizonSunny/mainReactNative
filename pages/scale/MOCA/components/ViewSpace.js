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

import { styles } from "../../../../../assets/css/common";
import { DrawNumberCircle } from "../../../../utils/drawNumberCircle";
import ligatureCoordinate from "./ligatureCoordinate";

let {
  Surface, //  一个矩形可渲染的区域，是其他元素的容器
  Group, // 可容纳多个形状、文本和其他的分组
  Shape, // 形状定义，可填充
  Path, // 路径
  LinearGradient, // 渐变色
  Pattern, // 填充图片
  ClippingRectangle // 剪辑
} = ART;
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
  canvas = React.createRef();
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
    // const ligatureCoordinate = ligatureCoordinate
    console.log("ligatureCoordinate_", ligatureCoordinate[0]["text"]);
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
                  width: dp(1000),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  1-1.请您按照
                  <Text style={{ color: "black", fontSize: font(40) }}>
                    (1甲2乙3丙4丁5戊的顺序连线)
                  </Text>
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
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvas}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(1300),
                  height: dp(700)
                }}
              >
                {ligatureCoordinate.map((item, index) => {
                  return (
                    <DrawNumberCircle
                      key={index}
                      circle={item["circle"]}
                      text={item["text"]}
                    />
                  );
                })}
              </Canvas>
              {/* 预留画子canvas的地方 */}
            </View>
            <View style={{ alignItems: "center", marginTop: dp(100) }} />
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </View>
        )}
      </React.Fragment>
    );
  }
}
