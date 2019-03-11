/**
 * Created by zxf on 2018.9.17.
 */
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
import TopBar from "../../../components/TopBar/TopBar";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

import {BackgroundImage} from "../../../components/BackgroundImage/BackgroundImage";
import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import DoctorHelpWaring from "../../PageComponent/DoctorHelpWaring/DoctorHelpWaring";
import {Image} from "react-native/Libraries/Animated/src/Animated";
import PrevButton from "../../PageComponent/PrevButton/PrevButton";
import Radio from "../../../components/Radio/src/Radio";
import KeyBoardNumber from "../../../components/tools/KeyBoardNumber";

import RadioButton from "../../../components/RadioButton/src/RadioButton";

import Canvas from "../../../components/Canvas/Canvas";

import {inject} from 'mobx-react'
import RNbridge from "../../../components/RNbridge/RNbridge";
import Audio from "../../../components/Audio/Audio";

import * as dateTime from '../../../utils/getDate';
// 量表的各个问题模块
import DirectiveForce from './components/DirectiveForce';
import ImmediatelyRecall from './components/ImmediatelyRecall';
import CalculAteattention from './components/CalculAteattention';
// import ReduceSevenCompentent from './components/ReduceSevenCompentent';
import Named from './components/Named';
import Retell from './components/Retell';
import Read from './components/Read';
import Understand from './components/Understand';
import Write from './components/Write';
import ViewSpace from './components/ViewSpace';
import DelayRecall from './components/DelayRecall';


/**
 * @description 把一个量表按问题模块划分，最后再汇总到这个父级模块进行计算
 * @export
 * @class MMSE
 */
@inject('rootStore')
export default class MMSE extends React.Component {
	constructor(props) {
		super(props)
		// 初始化answer
		let defaultAnswer = {
			mmse1: '',
			mmse2: '',
			mmse3: '',
			mmse4: '',
			mmse5: '',
			mmse6: '',
			mmse7: '',
			mmse8: '',
			mmse9: '',
			mmse10: '',
			mmse11s1: '',
			mmse11s2: '',
			mmse11s3: '',
			mmse12s1: '',
			mmse12s2: '',
			mmse12s3: '',
			mmse12s4: '',
			mmse12s5: '',
			mmse13s1: '',
			mmse13s2: '',
			mmse14: '',
			mmse15: '',
			mmse16s1: '',
			mmse16s2: '',
			mmse16s3: '',
			mmse17s2: '',
			mmse18s1: '',
			mmse18s2: '',
			mmse18Imgpath: '',
			mmse19s1: '',
			mmse19s2: '',
			mmse19s3: ''
		}
		// 代表精神量表的问题模块
		let questionTypeArr = ['directiveForce','immediatelyRecall','calculAteattention','named',
							   'retell','read','understand','write','viewSpace','delayRecall']
		// 如果有存储，就取存贮的值，没有的话,用于回显,其实没必要做回显，离开这个测评就再回不到这个测评
		// let answer = this.props.rootStore.scaleAnswer["MMSE"] ? echoAnswer() : defaultAnswer
		// let answer = defaultAnswer
		this.state = {
			modalVisible: false,
			homePage: true,
			questionType: questionTypeArr[0],
			questionTypeIndex: 0,
			answers: defaultAnswer,
			directionForward: true,
			// 各个问题模块的答案
			directiveForce:{
				questionInfo:''
			},
			reduceSevenResult:''
		};
	}
	// 引用真实的dom节点
	// canvas = React.createRef();

	
	/**
	 * @description 进行汇总计算
	 * @returns
	 */
	calculateScore() {
		// 获取时间
		const year = dateTime.getYear();
		const month = dateTime.getMonth();
		const today = dateTime.getToday();
		const week = dateTime.getWeek();
		console.log('calculateScore_week' + week);
		// const now = new Date();
		// const year = now.getFullYear();
		// let month = now.getMonth() + 1;
		// const today = now.getDate();
		// const week = now.getDay();
		let season = 0;
		let sec7 = 0;
		const answers = Object.assign({}, this.state.answers);
		answers.mmse18Imgpath = 0;
	
		answers.mmse1 = year === +answers.mmse1 ? 1 : 0;  // 今年年份
		if (month <= 2) { // 处理月份
			season = month + 12;
		} else {
			season = month;
		}
		season = season - (answers.mmse2 * 3 + 3); // 算季节对错
		answers.mmse2 = +answers.mmse2 === season > 0 && season <= 3 ? 1 : 0;
		answers.mmse3 = +answers.mmse3 === month ? 1 : 0;
		answers.mmse4 = +answers.mmse4 === today ? 1 : 0;
		answers.mmse5 = +answers.mmse5 === week ? 1 : 0;
		// sec7 是为了计算每次减七得分是否正确，正确加一分
		sec7 += +answers.mmse12s1 === 93 ? 1 : 0;
		sec7 += +answers.mmse12s2 === +answers.mmse12s1 - 7 ? 1 : 0;
		sec7 += +answers.mmse12s3 === +answers.mmse12s2 - 7 ? 1 : 0;
		sec7 += +answers.mmse12s4 === +answers.mmse12s3 - 7 ? 1 : 0;
		sec7 += +answers.mmse12s5 === +answers.mmse12s4 - 7 ? 1 : 0;
		answers.mmse12 = sec7;
		console.log('answers.mmse12_mmes'+ answers.mmse12);
		// 这个不需要，因为后面会将客户的填写信息传送给后端
		// answers.mmse12s1 = 0;
		// answers.mmse12s2 = 0;
		// answers.mmse12s3 = 0;
		// answers.mmse12s4 = 0;
		// answers.mmse12s5 = 0;
		let totalScore = 0;
		totalScore = answers.mmse1 +
			answers.mmse2 +
			answers.mmse3+
			answers.mmse4+
			answers.mmse5+
			answers.mmse6+
			answers.mmse7+
			answers.mmse8+
			answers.mmse9+
			answers.mmse10+
			answers.mmse11s1+
			answers.mmse11s2+
			answers.mmse11s3+
			// answers.mmse12+
			answers.mmse12s1+
			answers.mmse12s2+
			answers.mmse12s3+
			answers.mmse12s4+
			answers.mmse12s5+
			answers.mmse13s1+
			answers.mmse13s2+
			answers.mmse14+
			answers.mmse15+
			answers.mmse16s1+
			answers.mmse16s2+
			answers.mmse16s3+
			answers.mmse17s2+
			answers.mmse18s1+
			answers.mmse18s2+
			answers.mmse18Imgpath+
			answers.mmse19s1+
			answers.mmse19s2+
			answers.mmse19s3
		// noinspection JSAnnotator
		const lastAnswers = Object.assign({}, this.state.answers);
		lastAnswers.mmse = totalScore;
		// this.setState({lastAnswers});
		if (lastAnswers.mmse >= 24) {
			lastAnswers.mmseResult = 1
			lastAnswers.reportResult = '正常'
		} else {
			lastAnswers.mmseResult = 0
			lastAnswers.reportResult = '异常'
		}

		// 收集报告页数据
		const reportData = {
			name: '总体认知能力测评',
			content: '总体认知能力',
			score: lastAnswers.mmse,
			referenceScore: '≥24',
			result: lastAnswers.reportResult,
			// ztrznlcp: lastAnswers.mmse,
			// sendToHe: 'ztrznlcp'
		}
		// this.props.rootStore.setReportData(reportData)
		return lastAnswers;
	}

	// 从子组件问题模块传上来的值，然后确定是向前还是向后
	childrenInfo = (questionType,questionInfo,direction) => {
		this.state[questionType]['questionInfo'] = questionInfo
		// 先判断是否是最前面一个或者最后面一个
		if(this.state.questionTypeIndex === 0){
			return;
		}else if(this.state.questionTypeIndex === this.questionTypeArr.length-1){
			this.save();
			return;
		}
		// 不是第一个和最后一个话，直接让question模块自增或者自减
		if(direction === 'forward'){
			this.setState({
				questionTypeIndex: --questionTypeIndex,
				directionForward: true
			})
		}else if(direction === 'backwards'){
			this.setState({
				questionTypeIndex: ++questionTypeIndex,
				directionForward: false
			})
		}
	}

	/**
	 * @description 从减7页面拿回来的值
	 */
	// showReduceResult = (answers)=>{
	// 	console.log('从减七页面拿到的数据_mmse12s1' + answers.mmse12s1);
	// 	// reduceSevenResult
	// 	this.setState({
	// 		reduceSevenResult:answers
	// 	})
	// }

	/**
	 * @description 最后的保存计算
	 */
	save = () => {
		const data = this.calculateScore()
		return

	};
	/**
	 * pic base64 str
	 * @param {String} base64
	 */
	// getBase64 = (base64) => {
	// 	console.log(base64);
	// 	if (base64 === '') {
	// 		ToastAndroid.show('请画图', ToastAndroid.SHORT);
	// 		return
	// 	}
	// 	let answers = this.state.answers;
	// 	answers.mmse18Imgpath = base64;
	// 	this.setState({
	// 		answers: answers
	// 	}, () => {
	// 		this.goNext()
	// 	})
	// }
	/**
	 *
	 * @returns 测量问题页面,或者返回主页
	 */
	renderQuestionPage() {
		return (
			<View>
				{this.state.questionTypeIndex === 0 && <DirectiveForce directiveForce={this.state.directiveForce} directionForward={this.state.directionForward} callBack={this.childrenInfo}></DirectiveForce>}
				{this.state.questionTypeIndex === 1 && <ImmediatelyRecall></ImmediatelyRecall>}
				{this.state.questionTypeIndex === 2 && <CalculAteattention></CalculAteattention>}
				{this.state.questionTypeIndex === 3 && <Named></Named>}
				{this.state.questionTypeIndex === 4 && <Retell></Retell>}
				{this.state.questionTypeIndex === 5 && <Read></Read>}
				{this.state.questionTypeIndex === 6 && <Understand></Understand>}
				{this.state.questionTypeIndex === 7 && <Write></Write>}
				{this.state.questionTypeIndex === 8 && <ViewSpace></ViewSpace>}
				{this.state.questionTypeIndex === 9 && <DelayRecall></DelayRecall>}
			</View>
			)
	}
	// 必须绑定一个函数
	startMeasurement = () => {
		this.setState({
			homePage: false
		})
	}
	renderHomePage(){
		return(
			<View>
				<View style={{justifyContent: 'center',marginTop:dp(60)}}>
					<BackgroundImage source={require('./components/img/bk1.png')}
													style={{height: dp(500), width: dp(1725), alignItems: 'center'}}>
						<Text style={{
							fontSize: font(100),
							color: '#ffffff',
							marginTop: dp(120),
							fontWeight: "900",
							textAlign:'center'
						}}>总体认知能力测评{'\n'}MMSE</Text>
						<Text style={{fontSize:font(36),color:'#c4e1fe',marginTop:dp(40),}}>本次测评大约需要7分钟</Text>
					</BackgroundImage>
					<DoctorHelpWaring/>
				</View>
				<View style={{alignItems: 'center', marginTop: dp(20)}}> 
					<ButtonImg
						source={require('./components/img/btn-default.png')}
						sourcePress={require('./components/img/btn-press.png')}
						style={{
							width: dp(382),
							height: dp(95),
							marginTop: dp(74),
							borderRadius: dp(10),
							overflow: 'hidden'
						}}
						onPress={this.startMeasurement}
						><Text
						style={{fontSize: font(40), fontWeight: 'bold', color: '#ffffff'}}>开始测评</Text></ButtonImg>
				</View>
			</View>   
			)
	}

	/**
	 * @description
	 * @returns
	 */
	render() {
		return (
			<View style={styles.container}>
				<TopBar onPress={this.onPress} content={{'completeForm':'3','evaluationName':'MMSE'}}/>
				{this.state.homePage && this.renderHomePage()}
				{ !this.state.homePage && this.renderQuestionPage()}
			</View>
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