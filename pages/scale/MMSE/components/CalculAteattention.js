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

export default class CalculAteattention extends React.Component {
  constructor(props) {
    super(props);
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      ball: objectClone(answerModel),
      nationalFlag: objectClone(answerModel),
      trees: objectClone(answerModel)
    };
    // 该问题模块下的该问题
    this.state = {
      reduceSeven: 5,
      questionModel: "calculAteattention",
      questionIndex: 0,
      questionInfo:
        this.props.calculAteattention["questionInfo"] === ""
          ? questionInfo
          : this.props.calculAteattention["calculAteattention"]
    };
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @description 表示下一次减法运算
   */
  goNext = () => {
    const noEmpty =
      (this.state.reduceSeven === 5 && this.state.answers.mmse12s1 === "") ||
      (this.state.reduceSeven === 4 && this.state.answers.mmse12s2 === "") ||
      (this.state.reduceSeven === 3 && this.state.answers.mmse12s3 === "") ||
      (this.state.reduceSeven === 2 && this.state.answers.mmse12s4 === "") ||
      (this.state.reduceSeven === 1 && this.state.answers.mmse12s5 === "");
    if (noEmpty) {
      ToastAndroid.show("请选择选项", ToastAndroid.SHORT);
      return;
    }
    console.log("this.state.reduceSeven_next_" + this.state.reduceSeven);
    if (this.state.reduceSeven > 1) {
      let _this = this;
      _this.setState({
        reduceSeven: _this.state.reduceSeven - 1
      });
      setTimeout(() => {
        console.log("reduceSeven_>1__" + this.state.reduceSeven);
      }, 1000);
    } else {
      setTimeout(() => {
        console.log("reduceSeven_<1_" + this.state.reduceSeven);
      }, 1000);
      this.goNextPage();
    }
  };
  /**
   * @description goto next page,如果不是箭头函数，则需要在constrctor 绑定this
   */
  goNextPage = () => {
    this.props.callbackReduce(this.state.answers);
  };
  onChange = (key, value) => {
    let answers = this.state.answers;
    if (this.state.reduceSeven === 5) {
      answers.mmse12s1 = value;
    } else if (this.state.reduceSeven === 4) {
      answers.mmse12s2 = value;
    } else if (this.state.reduceSeven === 3) {
      answers.mmse12s3 = value;
    } else if (this.state.reduceSeven === 2) {
      answers.mmse12s4 = value;
    } else if (this.state.reduceSeven === 1) {
      answers.mmse12s5 = value;
    }
    this.setState({ answers: answers });
  };
  reduce() {
    // if(this.state.reduceSeven === 5){
    return (
      <React.Fragment>
        {this.state.reduceSeven > 4 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: dp(45)
            }}
          >
            <Image
              source={require("./img/xh.png")}
              style={{
                width: dp(40),
                height: dp(40),
                marginTop: dp(25),
                marginRight: dp(45)
              }}
            />
            <Text style={{ fontSize: font(60) }}>100-7=</Text>
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
                textAlign: "center",
                color: "#434343",
                backgroundColor: "#fff",
                padding: dp(0),
                lineHeight: dp(100)
              }}
              disabled={true}
              editable={false}
              value={this.state.answers.mmse12s1}
            />
          </View>
        )}
        {this.state.reduceSeven <= 4 && <View style={{ height: dp(150) }} />}
        {this.state.reduceSeven > 3 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: dp(45)
            }}
          >
            <Text style={{ fontSize: font(60) }}>继续减7=</Text>
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
                textAlign: "center",
                color: "#434343",
                backgroundColor: "#fff",
                padding: dp(0),
                lineHeight: dp(100)
              }}
              disabled={true}
              editable={false}
              value={this.state.answers.mmse12s2}
            />
          </View>
        )}
        {this.state.reduceSeven > 2 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: dp(45)
            }}
          >
            <Text style={{ fontSize: font(60) }}>继续减7=</Text>
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
                textAlign: "center",
                color: "#434343",
                backgroundColor: "#fff",
                padding: dp(0),
                lineHeight: dp(100)
              }}
              disabled={true}
              editable={false}
              value={this.state.answers.mmse12s3}
            />
          </View>
        )}
        {this.state.reduceSeven > 1 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: dp(45)
            }}
          >
            <Text style={{ fontSize: font(60) }}>继续减7=</Text>
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
                textAlign: "center",
                color: "#434343",
                backgroundColor: "#fff",
                padding: dp(0),
                lineHeight: dp(100)
              }}
              disabled={true}
              editable={false}
              value={this.state.answers.mmse12s4}
            />
          </View>
        )}
        {this.state.reduceSeven > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: dp(45)
            }}
          >
            <Text style={{ fontSize: font(60) }}>继续减7=</Text>
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
                textAlign: "center",
                color: "#434343",
                backgroundColor: "#fff",
                padding: dp(0),
                lineHeight: dp(100)
              }}
              disabled={true}
              editable={false}
              value={this.state.answers.mmse12s5}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
  render() {
    return (
      <View style={{ flexDirection: "row", marginLeft: dp(350) }}>
        <View style={{ width: "50%", paddingRight: dp(300) }}>
          {this.reduce()}
        </View>
        <View style={{ width: "50%" }}>
          <KeyBoardNumber
            key={7}
            style={{ marginTop: dp(200) }}
            onEnsure={this.goNext}
            onChangeText={this.onChange.bind(this, "mmse12s1")}
            scu={false}
          />
        </View>
      </View>
    );
  }
}
