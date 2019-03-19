import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";

import { Image } from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import ButtonImg from "../../../../components/ButtonImg/ButtonImg";
import { BackgroundImage } from "../../../../components/BackgroundImage/BackgroundImage";
import Radio from "../../../../components/Radio/src/Radio";
import RadioButton from "../../../../components/RadioButton/src/RadioButton";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
import { questionDisplay } from "./questionInfo";

export default class ActiveItem extends React.Component {
  constructor(props) {
    super(props);
    console.log("question_", questionDisplay);
    this.state = {
      questionCurrentIndex: 0
    };
  }
  componentWillMount() {
    // let answerModel = {
    //   score: 0,
    //   answer: ""
    // };
    // let questionInfo = {
    //   watches: objectClone(answerModel),
    //   pencil: objectClone(answerModel)
    // };
    // if (this.props.questionModel["questionInfo"] === "") {
    //   this.setState({ questionInfo: questionInfo });
    // } else {
    //   this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    // }
  }
  goNext = () => {
    if (this.state.questionCurrentIndex === questionDisplay.length - 1) {
      return;
    }
    this.setState((prevState, props) => {
      questionCurrentIndex: prevState.questionCurrentIndex + 1;
    });
  };
  goPrev = () => {
    if (this.state.questionCurrentIndex === 0) {
      return;
    }
    this.setState((prevState, props) => {
      questionCurrentIndex: prevState.questionCurrentIndex - 1;
    });
  };
  renderItem(props) {
    return (
      <View style={{ marginTop: dp(50) }}>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: dp(50),
            height: dp(200)
          }}
        >
          <PageOrderCode index={1} />
          {/* 有副标题 */}
          {true && (
            <View
              style={{
                width: dp(1500),
                marginTop: dp(-570),
                marginLeft: dp(200)
              }}
            >
              <Text
                style={[
                  styles.questionText,
                  { width: dp(1500), fontSize: font(60), marginTop: dp(20) }
                ]}
              >
                {"有副标题"}
              </Text>
              <Text
                style={[
                  styles.questionText,
                  { width: dp(1500), fontSize: font(40) }
                ]}
              >
                【{"副标题"}】
              </Text>
            </View>
          )}
          {/* 无副标题的 */}
          {false && (
            <View
              style={{
                width: dp(1500),
                marginTop: dp(-570),
                marginLeft: dp(200)
              }}
            >
              <Text
                style={[
                  styles.questionText,
                  { width: dp(1500), fontSize: font(60), marginTop: dp(70) }
                ]}
              >
                {"无副标题"}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: dp(50),
            marginBottom: dp(50)
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: dp(1500),
              borderBottomWidth: dp(1),
              borderBottomColor: "#ddd"
            }}
          />
        </View>
        {/* <View style={{ alignItems: "center", marginTop: dp(20) }}>
          <RadioButton.RadioButtonGroup
            style={{
              width: dp(1500),
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}
            model={this.state.answers[data.name]}
            onChange={this.onChange2.bind(this, data.name)}
          >
            {data.options.map((item, index) => {
              return (
                <RadioButton
                  style={{
                    marginLeft: dp(50),
                    marginRight: dp(50),
                    marginTop: dp(20),
                    width: dp(600),
                    marginBottom: dp(30)
                  }}
                  text={item.text}
                  key={index}
                  value={item.value}
                />
              );
            })}
          </RadioButton.RadioButtonGroup>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(140) }} /> */}
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
      </View>
    );
  }
  renderTest(props) {
    return <Text>{props.index}</Text>;
  }
  render() {
    return (
      // this.renderItem()
      // {/* <Text>213</Text> */}
      <View>
        {questionDisplay.map((item, index) => {
          return (
            this.state.questionCurrentIndex === index &&
            this.renderTest(item, index)
          );
        })}
      </View>
    );
  }
}
const BASE_COLOR = "#479e13";
const styles = StyleSheet.create({
  baseColor: {
    color: BASE_COLOR
  },
  questionContainer: {
    backgroundColor: "#406dce",
    minHeight: dp(250),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    flexDirection: "row",
    height: dp(320),
    alignItems: "center",
    marginLeft: dp(240)
  },
  tableColumn1: {
    alignItems: "center",
    borderBottomColor: BASE_COLOR,
    borderBottomWidth: dp(0.5)
  },
  tableRow: {
    flex: 1,
    flexDirection: "row"
  },
  td: {
    fontSize: font(28),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  tdb: {
    backgroundColor: "rgb(246,246,246)"
  },
  radio: {
    width: dp(50),
    height: dp(50)
  },
  th: {
    fontSize: font(40),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  questions: {
    backgroundColor: "#406ece",
    minHeight: dp(200),
    alignItems: "center"
  },
  questionText: {
    width: dp(1200),
    color: "#2c2c2c",
    fontSize: font(60),
    lineHeight: dp(88),
    marginLeft: dp(41),
    paddingRight: dp(80),
    fontWeight: "100",
    textAlign: "center"
  },
  questionText1: {
    color: "#2c2c2c",
    fontSize: font(60)
  },
  quesNum: {
    fontSize: font(60),
    color: "#ffffff"
  },
  backButton: {
    width: dp(351),
    height: dp(80),
    borderWidth: dp(3),
    borderColor: "#f0b22b",
    backgroundColor: "#ffffff",
    borderRadius: dp(10),
    marginRight: dp(194),
    justifyContent: "center",
    alignItems: "center"
  }
});
