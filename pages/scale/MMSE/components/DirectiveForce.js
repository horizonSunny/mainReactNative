import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ToastAndroid,
	Modal,
	TouchableNativeFeedback,
	ScrollView
} from 'react-native';

import {Image} from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import {BackgroundImage} from "../../../../components/BackgroundImage/BackgroundImage";
import PrevButton from "../../../PageComponent/PrevButton/PrevButton";

// tools
import {objectClone} from '../../../../utils/objectClone'

export default class DirectiveForce extends React.Component{
    constructor(props){
        super(props);
        let answerModel = {
            score: 0,
            answer: ''
        }
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
        }
		this.state = {
            questionType: 'directiveForce',
            questionIndex: this.props.directionForward ? 0 : 9,
            questionInfo: this.props.directiveForce['questionInfo'] === '' ? questionInfo: this.props.directiveForce['questionInfo']
		}
    }
    // 调用keyboard回调的方法
    keyBoardChange = (key, value) =>{  
        // console.log('key_'+ key +'_answer_'+value);
        let questionInfo = this.state.questionInfo;
		questionInfo[key]['answer'] = value
        this.setState({questionInfo: questionInfo});
        // console.log('this_state_questionInfo_',this.state.questionInfo);
    }
    goPrev =()=> {
        if(this.state.questionIndex === 0){
            this.jumpWithParameter('forward');
            return 
        }
        this.setState({
            questionIndex: --this.state.questionIndex
        })
    }
    goNext = ()=>{
        // 表示是否有9个问题, 是否全部结束了
        console.log('this.state.questionIndex_',this.state.questionIndex);
        const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo).length
        if(this.state.questionIndex === (questionTotal - 1)){
           this.jumpWithParameter('backwards');
           return 
        }
        this.setState({
            questionIndex: ++this.state.questionIndex
        })
    }
    // 不管是跳上一个问题模块，还是下一个问题模块，都进行带参操作
    jumpWithParameter(order){
        this.props.callBack(this.state.questionType,this.state.questionInfo,order)
    }
    render(){
            return (
                    <React.Fragment>
				        {
                           this.state.questionIndex===0 && 
                           <View key={1} style={{marginTop:dp(30)}}>
                                <View style={{backgroundColor: '#fff', marginTop: dp(50), alignItems: 'center'}}>
                                    <BackgroundImage source={require('./img/bianhao1.png')} key={4}
                                                                    style={{
                                                                        width: dp(219),
                                                                        height: dp(98),
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: dp(-20)
                                                                    }}>
                                    <Text
                                            style={[styles.quesNum, {width: '100%'}, {textAlign: 'right'}, {paddingRight: dp(30)}]}>1<Text
                                            style={{fontSize: font(30)}}>/ 19</Text></Text>
                                    </BackgroundImage>
                                    <View style={{
                                        width: dp(800),
                                        marginTop: dp(-570),
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}>
                                        <Text style={[styles.questionText, {width: '100%'}]}>
                                            今年是哪一年？
                                        </Text>
                                    </View>
                                    <View style={{justifyContent: 'center'}}>
                                        <TextInput
                                            textContentType="telephoneNumber"
                                            placeholderTextColor="#434343"
                                            keyboardType="number-pad"
                                            style={{
                                                width: dp(300),
                                                height: dp(100),
                                                borderColor: '#444444',
                                                borderWidth: dp(1),
                                                fontSize: font(60),
                                                color: '#434343',
                                                textAlign:'center',
                                                backgroundColor: '#fff',
                                                padding:dp(0),
                                                lineHeight:dp(100)
                                            }}
                                            disabled={true}
                                            editable={false}
                                            value={this.state.questionInfo['thisYear']['answer']}/>
                                    </View>
                                </View>
                                <View style={{alignItems: 'center', marginTop: dp(35)}}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: dp(1500),
                                        borderBottomWidth: dp(1),
                                        borderBottomColor: '#ddd'
                                    }}></View>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: dp(60)
                                }}>

                                    <KeyBoardNumber
                                        key={4}
                                        onEnsure={this.goNext.bind(this, 'thisYear')}
                                        onChangeText={this.keyBoardChange.bind(this, 'thisYear')}
                                        scu={false}/>
                                </View>
                                <View style={{alignItems: 'center',}}>
                                    <PrevButton onPress={this.goPrev} text="上一页"
                                                            buttonStyle={{position: 'absolute', left: '50%', marginLeft: dp(-330)}}/>
                                    <PrevButton onPress={this.goNext.bind(this, 'thisYear')} text="继续" buttonStyle={{
                                        color: "#656565",
                                        position: 'absolute',
                                        left: '50%',
                                        marginLeft: 50
                                    }} textStyle={{color: "#656565"}}/>
                                </View>
                            </View>
		                }
                    </React.Fragment>
            )
    }
}

const BASE_COLOR = '#479e13';
const styles = StyleSheet.create({
	baseColor: {
		color: BASE_COLOR
	},
	questionContainer: {
		backgroundColor: '#406dce',
		minHeight: dp(250),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	radio: {
		width: dp(50),
		height: dp(50)
	},
	container: {
		flex: 1,
		backgroundColor: '#f2f9fd'
	},
	questions: {
		backgroundColor: '#406ece',
		minHeight: dp(200),
		alignItems: 'center'
	},
	questionText: {
		color: '#ffffff',
		fontSize: font(60),
		paddingTop: dp(30),
		paddingBottom: dp(30)

	},
	quesNum: {
		fontSize: font(40),
		color: '#ffffff',
		marginRight: dp(20),
		position: 'absolute',
		left: dp(20),
		top: dp(20)
	},
	backButton: {
		width: dp(351),
		height: dp(80),
		borderWidth: dp(3),
		borderColor: '#f0b22b',
		backgroundColor: '#ffffff',
		borderRadius: dp(10),
		marginRight: dp(194),
		justifyContent: 'center',
		alignItems: 'center'
	},
	table: {
		flexDirection: 'row',

	},
	tableRow: {
		flex: 1,
		flexDirection: 'row'
	},
	tableTh: {
		flex: 1,

		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: dp(0.5),
		borderColor: '#f0b22b'
	},
	tableTd: {
		flex: 1,

		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: dp(0.5),
		borderColor: '#f0b22b'
	},
	tableThText: {
		fontSize: font(40)
	},
	baseColor: {
		color: BASE_COLOR
	},
	questionContainer: {
		backgroundColor: '#406dce',
		minHeight: dp(250),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	table: {
		flexDirection: 'row',
		height: dp(320),
		alignItems: 'center',
		marginLeft: dp(240)
	},
	tableColumn1: {
		alignItems: 'center',
		borderBottomColor: BASE_COLOR,
		borderBottomWidth: dp(0.5),
	},
	tableRow: {
		flex: 1,
		flexDirection: 'row'
	},
	td: {
		fontSize: font(28),
		color: '#777777',
		width: dp(400),
		textAlign: 'center',
		textAlignVertical: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: dp(0.5),
		borderColor: BASE_COLOR,
	},
	tdb: {
		backgroundColor: 'rgb(246,246,246)'
	},
	radio: {
		width: dp(50),
		height: dp(50)
	},
	th: {
		fontSize: font(40),
		color: '#777777',
		width: dp(400),
		textAlign: 'center',
		textAlignVertical: 'center',
		borderWidth: dp(0.5),
		borderColor: BASE_COLOR,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	questions: {
		backgroundColor: '#406ece',
		minHeight: dp(200),
		alignItems: 'center'
	},
	questionText: {
		width: dp(1200),
		color: '#2c2c2c',
		fontSize: font(60),
		lineHeight: dp(88),
		marginLeft: dp(41),
		paddingRight: dp(80),
		fontWeight: '100',
		textAlign: 'center'
	},
	questionText1: {
		color: '#2c2c2c',
		fontSize: font(60),
	},
	quesNum: {
		fontSize: font(60),
		color: '#ffffff'
	},
	backButton: {
		width: dp(351),
		height: dp(80),
		borderWidth: dp(3),
		borderColor: '#f0b22b',
		backgroundColor: '#ffffff',
		borderRadius: dp(10),
		marginRight: dp(194),
		justifyContent: 'center',
		alignItems: 'center',
	}
});