/**
 * Created by zxf on 2018.9.17.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBar from "../../../components/TopBar/TopBar";
// import ProgressBar from "../../../components/ProgressBar/ProgressBar";

import { BackgroundImage } from "../../../components/BackgroundImage/BackgroundImage";
import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import DoctorHelpWaring from "../../PageComponent/DoctorHelpWaring/DoctorHelpWaring";
import { inject } from "mobx-react";
import * as dateTime from "../../../utils/getDate";
// 量表的各个问题模块
import DirectiveForce from "./components/DirectiveForce";
import ImmediatelyRecall from "./components/ImmediatelyRecall";
import CalculAteattention from "./components/CalculAteattention";
import Named from "./components/Named";
import Retell from "./components/Retell";
import Read from "./components/Read";
import Understand from "./components/Understand";
import Write from "./components/Write";
import ViewSpace from "./components/ViewSpace";
import DelayRecall from "./components/DelayRecall";

/**
 * @description 把一个量表按问题模块划分，最后再汇总到这个父级模块进行计算
 * @export
 * @class MMSE
 */
@inject("rootStore")
export default class MMSE extends React.Component {
  constructor(props) {
    super(props);
    // 初始化answer
    let defaultAnswer = {
      mmse1: "",
      mmse2: "",
      mmse3: "",
      mmse4: "",
      mmse5: "",
      mmse6: "",
      mmse7: "",
      mmse8: "",
      mmse9: "",
      mmse10: "",
      mmse11s1: "",
      mmse11s2: "",
      mmse11s3: "",
      mmse12s1: "",
      mmse12s2: "",
      mmse12s3: "",
      mmse12s4: "",
      mmse12s5: "",
      mmse13s1: "",
      mmse13s2: "",
      mmse14: "",
      mmse15: "",
      mmse16s1: "",
      mmse16s2: "",
      mmse16s3: "",
      mmse17s2: "",
      mmse18s1: "",
      mmse18s2: "",
      mmse18Imgpath: "",
      mmse19s1: "",
      mmse19s2: "",
      mmse19s3: ""
    };
    // 代表精神量表的问题模块
    let questionModelArr = [
      "directiveForce",
      "immediatelyRecall",
      "calculAteattention",
      "named",
      "retell",
      "read",
      "understand",
      "write",
      "viewSpace",
      "delayRecall"
    ];
    // 如果有存储，就取存贮的值，没有的话,用于回显,其实没必要做回显，离开这个测评就再回不到这个测评
    // let answer = this.props.rootStore.scaleAnswer["MMSE"] ? echoAnswer() : defaultAnswer
    // let answer = defaultAnswer
    this.state = {
      modalVisible: false,
      homePage: true,
      questionModel: questionModelArr[0],
      questionModelIndex: 0,
      answers: defaultAnswer,
      // 表示该模块是走正序还是反序
      directionForward: true,
      // 各个问题模块的答案
      directiveForce: {
        questionInfo: ""
      }
    };
  }

  /**
   * @description 进行汇总计算
   * @returns
   */
  calculateScore() {}

  // 从子组件问题模块传上来的值，然后确定是向前还是向后
  childrenInfo = (questionModel, questionInfo, direction) => {
    console.log("come_MMSE");
    this.state[questionModel]["questionInfo"] = questionInfo;
    // 先判断是否是最前面一个或者最后面一个
    if (this.state.questionModelIndex === 0) {
      return;
    } else if (
      this.state.questionModelIndex ===
      this.questionModelArr.length - 1
    ) {
      this.save();
      return;
    }
    // 不是第一个和最后一个话，直接让question模块自增或者自减
    if (direction === "forward") {
      this.setState({
        questionModelIndex: --questionModelIndex,
        directionForward: true
      });
    } else if (direction === "backwards") {
      this.setState({
        questionModelIndex: ++questionModelIndex,
        directionForward: false
      });
      console.log(
        "MMSE_backwards_questionModelIndex_" + this.state.questionModelIndex
      );
    }
  };

  /**
   * @description 最后的保存计算
   */
  save = () => {
    const data = this.calculateScore();
    return;
  };
  /**
   *
   * @returns 测量问题页面,或者返回主页
   */
  renderQuestionPage() {
    return (
      <View>
        {this.state.questionModelIndex === 0 && (
          <DirectiveForce
            directiveForce={this.state.directiveForce}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 1 && <ImmediatelyRecall />}
        {this.state.questionModelIndex === 2 && <CalculAteattention />}
        {this.state.questionModelIndex === 3 && <Named />}
        {this.state.questionModelIndex === 4 && <Retell />}
        {this.state.questionModelIndex === 5 && <Read />}
        {this.state.questionModelIndex === 6 && <Understand />}
        {this.state.questionModelIndex === 7 && <Write />}
        {this.state.questionModelIndex === 8 && <ViewSpace />}
        {this.state.questionModelIndex === 9 && <DelayRecall />}
      </View>
    );
  }
  // 必须绑定一个函数,设置不是首页，让取第一个测评问题模块页面
  startMeasurement = () => {
    this.setState({
      homePage: false
    });
  };
  renderHomePage() {
    return (
      <View>
        <View style={{ justifyContent: "center", marginTop: dp(60) }}>
          <BackgroundImage
            source={require("./components/img/bk1.png")}
            style={{ height: dp(500), width: dp(1725), alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: font(100),
                color: "#ffffff",
                marginTop: dp(120),
                fontWeight: "900",
                textAlign: "center"
              }}
            >
              总体认知能力测评{"\n"}MMSE
            </Text>
            <Text
              style={{
                fontSize: font(36),
                color: "#c4e1fe",
                marginTop: dp(40)
              }}
            >
              本次测评大约需要7分钟
            </Text>
          </BackgroundImage>
          <DoctorHelpWaring />
        </View>
        <View style={{ alignItems: "center", marginTop: dp(20) }}>
          <ButtonImg
            source={require("./components/img/btn-default.png")}
            sourcePress={require("./components/img/btn-press.png")}
            style={{
              width: dp(382),
              height: dp(95),
              marginTop: dp(74),
              borderRadius: dp(10),
              overflow: "hidden"
            }}
            onPress={this.startMeasurement}
          >
            <Text
              style={{
                fontSize: font(40),
                fontWeight: "bold",
                color: "#ffffff"
              }}
            >
              开始测评
            </Text>
          </ButtonImg>
        </View>
      </View>
    );
  }

  /**
   * @description
   * @returns
   */
  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onPress={this.onPress}
          content={{ completeForm: "3", evaluationName: "MMSE" }}
        />
        {this.state.homePage && this.renderHomePage()}
        {!this.state.homePage && this.renderQuestionPage()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f9fd"
  }
});
