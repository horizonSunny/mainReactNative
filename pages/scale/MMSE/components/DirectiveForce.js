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
import { BackgroundImage } from "../../../../components/BackgroundImage/BackgroundImage";
import PrevButton from "../../../PageComponent/PrevButton/PrevButton";
import Radio from "../../../../components/Radio/src/Radio";
import RadioButton from "../../../../components/RadioButton/src/RadioButton";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import DoctorHelpConfirm from "../../../PageComponent/DoctorHelpConfirm/DoctorHelpConfirm";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";

// tools
import { objectClone } from "../../../../utils/objectClone";

export default class DirectiveForce extends React.Component {
  constructor(props) {
    super(props);
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      thisYear: objectClone(answerModel),
      thisSeason: objectClone(answerModel),
      thisMonth: objectClone(answerModel),
      today: objectClone(answerModel),
      weekDay: objectClone(answerModel),
      city: objectClone(answerModel),
      county: objectClone(answerModel),
      street: objectClone(answerModel),
      floor: objectClone(answerModel),
      organization: objectClone(answerModel)
    };
    this.state = {
      questionModel: "directiveForce",
      questionIndex: this.props.directionForward ? 0 : 9,
      questionInfo:
        this.props.directiveForce["questionInfo"] === ""
          ? questionInfo
          : this.props.directiveForce["questionInfo"]
    };
  }
  // 调用keyboard回调的方法
  keyBoardChange = (key, value) => {
    // console.log('key_'+ key +'_answer_'+value);
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
    // console.log('this_state_questionInfo_',this.state.questionInfo);
  };
  // 该模块上一个问题
  goPrev = () => {
    if (this.state.questionIndex === 0) {
      this.jumpWithParameter("forward");
      return;
    }
    this.setState({
      questionIndex: --this.state.questionIndex
    });
  };
  goNext = () => {
    console.log("this.state.questionIndex_", this.state.questionIndex);
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    // 判断是否为空，为空则return
    const questionType = questionTotal[this.state.questionIndex];
    if (this.state.questionInfo[questionType]["answer"] === "") {
      androidToast("请选择选项");
      return;
    }
    // 表示是否有9个问题, 是否全部结束了
    if (this.state.questionIndex === questionTotal.length - 1) {
      this.jumpWithParameter("backwards");
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  // 不管是跳上一个问题模块，还是下一个问题模块，都进行带参操作
  jumpWithParameter(order) {
    this.props.callBack(
      this.state.questionModel,
      this.state.questionInfo,
      order
    );
  }

  render() {
    const season = [
      {
        text: "春季",
        value: 0
      },
      {
        text: "夏季",
        value: 1
      },
      {
        text: "秋季",
        value: 2
      },
      {
        text: "冬季",
        value: 3
      }
    ];
    const weekDay = [
      {
        text: "星期一",
        value: 1
      },
      {
        text: "星期二",
        value: 2
      },
      {
        text: "星期三",
        value: 3
      },
      {
        text: "星期四",
        value: 4
      },
      {
        text: "星期五",
        value: 5
      },
      {
        text: "星期六",
        value: 6
      },
      {
        text: "星期日",
        value: 7
      }
    ];
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
              <PageOrderCode index={this.state.questionIndex + 1} />
              <View
                style={{
                  width: dp(800),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  今年是哪一年？
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <TextInput
                  textContentType="telephoneNumber"
                  placeholderTextColor="#434343"
                  keyboardType="number-pad"
                  style={{
                    width: dp(300),
                    height: dp(100),
                    borderColor: "#444444",
                    borderWidth: dp(1),
                    fontSize: font(60),
                    color: "#434343",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    padding: dp(0),
                    lineHeight: dp(100)
                  }}
                  disabled={true}
                  editable={false}
                  value={this.state.questionInfo["thisYear"]["answer"]}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", marginTop: dp(35) }}>
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
            <View style={{ alignItems: "center" }}>
              <PrevButton
                onPress={this.goPrev}
                text="上一页"
                buttonStyle={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: dp(-330)
                }}
              />
              <PrevButton
                onPress={this.goNext.bind(this, "thisYear")}
                text="继续"
                buttonStyle={{
                  color: "#656565",
                  position: "absolute",
                  left: "50%",
                  marginLeft: 50
                }}
                textStyle={{ color: "#656565" }}
              />
            </View>
          </View>
        )}
        {this.state.questionIndex === 1 && (
          <React.Fragment>
            <View style={{ marginTop: dp(30) }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  marginTop: dp(50),
                  height: dp(200)
                }}
              >
                <PageOrderCode index={this.state.questionIndex + 1} />
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
                      { width: dp(1500), marginTop: dp(20), fontSize: font(60) }
                    ]}
                  >
                    现在是什么季节？
                  </Text>
                </View>
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
              <View style={{ alignItems: "center", marginTop: dp(20) }}>
                <RadioButton.RadioButtonGroup
                  style={{
                    width: dp(800),
                    height: dp(300),
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "nowrap"
                  }}
                  model={this.state.questionInfo["thisSeason"]["answer"]}
                  onChange={this.keyBoardChange.bind(this, "thisSeason")}
                >
                  {season.map((item, index) => {
                    return (
                      <RadioButton
                        style={{
                          marginLeft: dp(50),
                          marginRight: dp(50),
                          marginTop: dp(20),
                          width: dp(300)
                        }}
                        text={item.text}
                        key={index}
                        value={item.value}
                      />
                    );
                  })}
                </RadioButton.RadioButtonGroup>
              </View>
              <View style={{ alignItems: "center", marginTop: 70 }}>
                <PrevButton
                  onPress={this.goPrev}
                  text="上一页"
                  buttonStyle={{
                    position: "absolute",
                    left: "50%",
                    marginLeft: dp(-330)
                  }}
                />
                <PrevButton
                  onPress={this.goNext.bind(this, "thisSeason")}
                  text="继续"
                  buttonStyle={{
                    color: "#656565",
                    position: "absolute",
                    left: "50%",
                    marginLeft: dp(50)
                  }}
                  textStyle={{ color: "#656565" }}
                />
              </View>
            </View>
          </React.Fragment>
        )}
        {this.state.questionIndex === 2 && (
          <View style={{ marginTop: dp(30) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(50),
                alignItems: "center"
              }}
            >
              <PageOrderCode index={this.state.questionIndex + 1} />
              <View
                style={{
                  width: dp(800),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  现在是几月？
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <TextInput
                  textContentType="telephoneNumber"
                  placeholderTextColor="#434343"
                  keyboardType="number-pad"
                  style={{
                    width: dp(300),
                    height: dp(100),
                    borderColor: "#444444",
                    borderWidth: dp(1),
                    fontSize: font(60),
                    color: "#434343",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    padding: dp(0),
                    lineHeight: dp(100)
                  }}
                  disabled={true}
                  editable={false}
                  value={this.state.questionInfo["thisMonth"]["answer"]}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", marginTop: dp(35) }}>
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
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(60)
              }}
            >
              <KeyBoardNumber
                onEnsure={this.goNext.bind(this, "thisMonth")}
                onChangeText={this.keyBoardChange.bind(this, "thisMonth")}
                scu={false}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <PrevButton
                onPress={this.goPrev}
                text="上一页"
                buttonStyle={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: dp(-330)
                }}
              />
              <PrevButton
                onPress={this.goNext.bind(this, "thisMonth")}
                text="继续"
                buttonStyle={{
                  color: "#656565",
                  position: "absolute",
                  left: "50%",
                  marginLeft: dp(50)
                }}
                textStyle={{ color: "#656565" }}
              />
            </View>
          </View>
        )}
        {this.state.questionIndex === 3 && (
          <View style={{ marginTop: dp(30) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(50),
                alignItems: "center"
              }}
            >
              <PageOrderCode index={this.state.questionIndex + 1} />
              <View
                style={{
                  width: dp(800),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  今天是几号？
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <TextInput
                  textContentType="telephoneNumber"
                  placeholderTextColor="#434343"
                  keyboardType="number-pad"
                  style={{
                    width: dp(300),
                    height: dp(100),
                    borderColor: "#444444",
                    borderWidth: dp(1),
                    fontSize: font(60),
                    color: "#434343",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    padding: dp(0),
                    lineHeight: dp(100)
                  }}
                  disabled={true}
                  editable={false}
                  value={this.state.questionInfo["today"]["answer"]}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", marginTop: dp(35) }}>
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
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(60)
              }}
            >
              <KeyBoardNumber
                onEnsure={this.goNext.bind(this, "today")}
                onChangeText={this.keyBoardChange.bind(this, "today")}
                scu={false}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <PrevButton
                onPress={this.goPrev}
                text="上一页"
                buttonStyle={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: dp(-330)
                }}
              />
              <PrevButton
                onPress={this.goNext.bind(this, "today")}
                text="继续"
                buttonStyle={{
                  color: "#656565",
                  position: "absolute",
                  left: "50%",
                  marginLeft: dp(50)
                }}
                textStyle={{ color: "#656565" }}
              />
            </View>
          </View>
        )}
        {this.state.questionIndex === 4 && (
          <React.Fragment>
            <View style={{ marginTop: dp(30) }}>
              <View style={{ backgroundColor: "#fff", marginTop: dp(50) }}>
                <PageOrderCode index={this.state.questionIndex + 1} />
                <View
                  style={{
                    flexDirection: "row",
                    width: dp(1500),
                    marginTop: dp(-570),
                    marginLeft: dp(200)
                  }}
                >
                  <Text
                    style={[
                      styles.questionText,
                      {
                        height: dp(150),
                        width: dp(1500),
                        fontSize: font(60),
                        marginTop: dp(20)
                      }
                    ]}
                  >
                    今天星期几？
                  </Text>
                </View>
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
              <View style={{ alignItems: "center", marginTop: dp(20) }}>
                <RadioButton.RadioButtonGroup
                  style={{
                    width: dp(1200),
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap"
                  }}
                  model={this.state.questionInfo["weekDay"]["answer"]}
                  onChange={this.keyBoardChange.bind(this, "weekDay")}
                >
                  {weekDay.map((item, index) => {
                    return (
                      <RadioButton
                        style={{
                          marginLeft: dp(30),
                          marginRight: dp(30),
                          marginTop: dp(20)
                        }}
                        text={item.text}
                        key={index}
                        value={item.value}
                      />
                    );
                  })}
                </RadioButton.RadioButtonGroup>
              </View>
              <View style={{ alignItems: "center", marginTop: 70 }}>
                <PrevButton
                  onPress={this.goPrev}
                  text="上一页"
                  buttonStyle={{
                    position: "absolute",
                    left: "50%",
                    marginLeft: dp(-330)
                  }}
                />
                <PrevButton
                  onPress={this.goNext.bind(this, "weekDay")}
                  text="继续"
                  buttonStyle={{
                    color: "#656565",
                    position: "absolute",
                    left: "50%",
                    marginLeft: dp(50)
                  }}
                  textStyle={{ color: "#656565" }}
                />
              </View>
            </View>
          </React.Fragment>
        )}
        {this.state.questionIndex === 5 && (
          <DoctorHelpConfirm
            question={"现在您在哪个省哪个市?"}
            questionType={"city"}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
          />
        )}
        {this.state.questionIndex === 6 && (
          <DoctorHelpConfirm
            question={"您住在什么区(县)?"}
            questionType={"county"}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
          />
        )}
        {this.state.questionIndex === 7 && (
          <DoctorHelpConfirm
            question={"您住在什么街道(乡)？"}
            questionType={"street"}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
          />
        )}
        {this.state.questionIndex === 8 && (
          <DoctorHelpConfirm
            question={"我们现在是在第几层楼？"}
            questionType={"floor"}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
          />
        )}
        {this.state.questionIndex === 9 && (
          <DoctorHelpConfirm
            question={"这儿是什么地方？"}
            questionType={"organization"}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
          />
        )}
      </React.Fragment>
    );
  }
}

const BASE_COLOR = "#479e13";
const styles = StyleSheet.create({
  radio: {
    width: dp(50),
    height: dp(50)
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f9fd"
  },
  questionText: {
    fontSize: font(60),
    paddingTop: dp(30),
    paddingBottom: dp(30),
    width: dp(1200),
    color: "#2c2c2c",
    lineHeight: dp(88),
    marginLeft: dp(41),
    paddingRight: dp(80),
    fontWeight: "100",
    textAlign: "center"
  },
  table: {
    flexDirection: "row"
  },
  tableRow: {
    flex: 1,
    flexDirection: "row"
  },
  tableTh: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: dp(0.5),
    borderColor: "#f0b22b"
  },
  tableTd: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: dp(0.5),
    borderColor: "#f0b22b"
  },
  tableThText: {
    fontSize: font(40)
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
  }
});
