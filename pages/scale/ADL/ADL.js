
import React from 'react';
import {View, Text, StyleSheet, ImageBackground,ToastAndroid} from 'react-native';

import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import TopBar from "../../../components/TopBar/TopBar";
import {BackgroundImage} from '../../../components/BackgroundImage/BackgroundImage'
import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import RadioButton from '../../../components/RadioButton';
import PrevButton from "../../PageComponent/PrevButton/PrevButton";
import DoctorHelpWaring from '../../PageComponent/DoctorHelpWaring/DoctorHelpWaring'
import {inject} from 'mobx-react'
import RNbridge from "../../../components/RNbridge/RNbridge";

@inject('rootStore')
export default class ADL extends React.Component{
    constructor(props){
        super(props);
        let defaultAnswer={
					adlM1:'',
					adlM2:'',
					adlM3:'',
					adlM4:'',
					adlM5:'',
					adlM6:'',
					adlM7:'',
					adlM8:"",
					adlM9:"",
					adlM10:"",
					adlM11:"",
					adlM12:"",
					adlM13:"",
					adlM14:""
				}
        this.state={
					pageIndex:0,
					answers:answer
				}
    }
    questions=[
        {
            title:'自己搭乘公共汽车？',
            subTitle:'知道乘哪一路车，并能独自去',
            name:'adlM1',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },
        {
            title:'行走',
            subTitle:"",
            name:'adlM2',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'自己做饭',
            subTitle:'包括生火',
            name:'adlM3',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'做家务',
            subTitle:'',
            name:'adlM4',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'吃药',
            subTitle:'能记住按时吃药，并能正确服药',
            name:'adlM5',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'吃饭',
            subTitle:'',
            name:'adlM6',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'穿，脱衣服',
            subTitle:'',
            name:'adlM7',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'洗漱',
            subTitle:'',
            name:'adlM8',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'洗衣服',
            subTitle:'',
            name:'adlM9',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'洗澡',
            subTitle:'',
            name:'adlM10',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'购物',
            subTitle:'',
            name:'adlM11',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'上厕所',
            subTitle:'',
            name:'adlM12',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'打电话',
            subTitle:'',
            name:'adlM13',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        },{
            title:'管理个人钱财',
            subTitle:'',
            name:'adlM14',
            options:[
                {
                    text:'自己完全可以做',
                    value:0
                },
                {
                    text:'需要帮助',
                    value:1
                },
                {
                    text:'有些困难，自己尚能完成',
                    value:2
                },
                {
                    text:'根本不能做',
                    value:3
                }
            ]
        }
    ]

    calculateScore() {
        const answers = Object.assign({}, this.state.answers);
        let sum = 0;
        sum = answers.adlM1 +
	        answers.adlM2 +
	        answers.adlM3 +
	        answers.adlM4 +
	        answers.adlM5 +
	        answers.adlM6 +
	        answers.adlM7 +
	        answers.adlM8 +
	        answers.adlM9 +
	        answers.adlM10 +
	        answers.adlM11 +
	        answers.adlM12 +
	        answers.adlM13 +
	        answers.adlM14
        answers.adl = sum;
        if (answers.adl <= 14) {
            answers.adlResult = 1;
            answers.reportResult = '正常';
        } else {
            answers.adlResult = 0;
            answers.reportResult = '异常';
        }

        const reportData = {
            name: '日常生活能力测评',
            content: '日常生活能力',
            score: answers.adl,
            referenceScore: '≤14',
            result: answers.reportResult,
            rcshnlcp: answers.adl,
            sendToHe: 'rcshnlcp'
        }
        return answers;
    }
    goNext=(key)=>{
      this.nextTimer&&clearTimeout(this.nextTimer)
        if(this.state.answers[key]===''){
            ToastAndroid.show('请选择选项',ToastAndroid.SHORT);
            return
        }
        if(this.state.pageIndex===14){
            const data= this.calculateScore();
	        if(this.props.rootStore.commonInfo.schedule==="0"){
		        data.sort = 11
	        }else if(this.props.rootStore.commonInfo.schedule==="14"){
		        data.sort = 1
	        }else{
		        data.sort = 11
	        }
					if(this.props.rootStore.finishedScaleId["ADL"]){
						console.log('update--data')
						RNbridge.updateDataBase(String(this.props.rootStore.finishedScaleId["ADL"]),data,this.props.rootStore.commonInfo).then(res=>{
							if(res){
								console.log('res===',res)
								this.props.rootStore.saveScaleAnswer('ADL',{...this.state.answers})
								//公卫的流程
								if(this.props.rootStore.commonInfo.schedule==="0"){
									this.props.navigation.replace('Syndrome');
								}else{
									if(this.props.rootStore.commonInfo.schedule==="14"){
										// 单做的流程
										//this.props.rootStore.removeScaleName();
										if(this.props.rootStore.scaleName.length-1===0){
											this.props.navigation.replace('Report')
										}
										else{
											this.props.navigation.replace(parseRoute(this.props.rootStore.scaleName[0]))
										}
									}
									// 其他流程
									else{
										//this.props.rootStore.removeScaleName();
										if(this.props.rootStore.scaleName.length-1===this.routeIndex){
											this.props.navigation.replace('Report')
										}
										else{
											this.props.navigation.replace(parseRoute(this.props.rootStore.scaleName[this.routeIndex+1]))
										}
									}
								}
							}else{
								ToastAndroid.show("保存失败",ToastAndroid.SHORT);
							}
						})
					}
					else{
						RNbridge.saveDataBase('clinicalAdl/create',data,this.props.rootStore.commonInfo).then(res=>{
							if(res){
								this.props.rootStore.saveFininshedScaleId('ADL',res)
								this.props.rootStore.saveScaleAnswer("ADL",{...this.state.answers})
								//公卫的流程
								if(this.props.rootStore.commonInfo.schedule==="0"){
									this.props.navigation.replace('Syndrome');
								}else{

									if(this.props.rootStore.commonInfo.schedule==="14"){
										// 单做的流程
										//this.props.rootStore.removeScaleName();
										console.log(this.props.rootStore.scaleName.length)
										if(this.props.rootStore.scaleName.length-1===0){
											this.props.navigation.replace('Report')
										}
										else{
											this.props.navigation.replace(parseRoute(this.props.rootStore.scaleName[0]))
										}
									}
									// 其他流程
									else{
										//this.props.rootStore.removeScaleName();
										if(this.props.rootStore.scaleName.length-1===this.routeIndex){
											this.props.navigation.replace('Report')
										}
										else{
											this.props.navigation.replace(parseRoute(this.props.rootStore.scaleName[this.routeIndex+1]))
										}
									}
								}
							}else{
								ToastAndroid.show("保存失败",ToastAndroid.SHORT);
							}
						})

					}
           // Http.post('http://192.168.0.192:16020/clinicalAdl/create',data).then((res)=>{
            //     if(res.code===0){
            //         ToastAndroid.show('保存成功',ToastAndroid.SHORT)
            //     }
            // })
            // ToastAndroid.show('做完el',ToastAndroid.SHORT);
            // return
        }
        if(this.state.pageIndex<14){
	        let pageIndex=this.state.pageIndex;
	        this.setState({
		        pageIndex:++pageIndex
	        });
        }

    }
    goPrev=()=>{
        this.setState({
            pageIndex:--this.state.pageIndex
        })
    }
    onChange2=(key,value)=>{
        this.state.answers[key]=value
        this.setState({answers:this.state.answers},()=>{
            if(this.state.pageIndex !==14){
                this.nextTimer&&clearTimeout(this.nextTimer)
                this.nextTimer=setTimeout(()=>{
                    this.goNext(key)
                },500)
            }
        })
    }
    renderPage(){
        const pageIndex=this.state.pageIndex;
        let questionsLists=this.questions;
        if(pageIndex===0){
            return(
                <React.Fragment>
                    <View style={{justifyContent: 'center',marginTop:dp(60)}}>
                        <BackgroundImage source={require('./img/bk1.png')}
                                         style={{height: dp(625), width: dp(1725), alignItems: 'center',marginTop:dp(125)}}>
                            <Text style={{
                                fontSize: font(100),
                                color: '#ffffff',
                                marginTop: dp(170),
                                fontWeight: "900",
	                            textAlign:'center'
                            }}>日常生活能力测评{'\n'}ADL</Text>
                          <Text style={{fontSize:font(36),color:'#c4e1fe',marginTop:dp(40),}}>本次测评大约需要3分钟</Text>
                        </BackgroundImage>
                        {/*<DoctorHelpWaring/>*/}
                    </View>
                    <View style={{alignItems: 'center', marginTop: dp(80)}}>
                        <ButtonImg
                            source={require('./img/btn-default.png')}
                            sourcePress={require('./img/btn-press.png')}
                            style={{
                                width: dp(382),
                                height: dp(95),
                                marginTop: dp(74),
                                borderRadius: dp(10),
                                overflow: 'hidden'
                            }}
                            onPress={this.goNext}><Text
                            style={{fontSize: font(40), fontWeight: 'bold', color: '#ffffff'}}>开始测评</Text></ButtonImg>
                    </View>
                </React.Fragment>
            )
        }else if(pageIndex === 14){
	        const data=questionsLists[pageIndex-1];
	        return(
		        <React.Fragment>
			        <View style={{marginTop: dp(50)}} key={pageIndex}>
				        <View style={{backgroundColor: '#fff', marginTop: dp(50),height:dp(200)}}>
					        <BackgroundImage source={require('./img/bianhao1.png')} key={3}
					                         style={{width: dp(219), height: dp(98), position: 'absolute', top: 0, left: dp(-20)}}>
						        <Text style={[styles.quesNum, {width:'100%'},{textAlign:'right'},{paddingRight:dp(30)}]}>{this.state.pageIndex}<Text style={{fontSize: font(30)}}>/ 14</Text></Text>
					        </BackgroundImage>
					        <View style={{ width: dp(1500), marginTop: dp(-570), marginLeft: dp(200)}}>
						        <Text style={[styles.questionText,{width:dp(1500),fontSize:font(60),marginTop:dp(70)}]}>
							        {data.title}
						        </Text>
					        </View>
				        </View>
				        <View style={{alignItems: 'center',marginTop:dp(50),marginBottom:dp(50)}}>
					        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: dp(1500), borderBottomWidth: dp(1), borderBottomColor: '#ddd'}}></View>
				        </View>
				        <View style={{alignItems: 'center',marginTop:dp(20)}}>
					        <RadioButton.RadioButtonGroup
						        style={{
							        width: dp(1500),
							        justifyContent: 'center',
							        alignItems: 'center',
							        flexWrap: 'wrap',
						        }}
						        model={this.state.answers[data.name]}
						        onChange={this.onChange2.bind(this, data.name)}
					        >

						        {data.options.map((item, index) => {
							        return (
								        <RadioButton style={{marginLeft: dp(50), marginRight: dp(50), marginTop: dp(20),width:dp(600),marginBottom:dp(30)}} text={item.text}
								                     key={index} value={item.value}/>)
						        })}

					        </RadioButton.RadioButtonGroup>
				        </View>
				        <View style={{alignItems: 'center', marginTop: dp(140)}}>
					        <PrevButton onPress={this.goPrev} text="上一页"
					                    buttonStyle={{position: 'absolute', left: '50%', marginLeft: dp(-330)}}/>
					        <PrevButton onPress={this.goNext.bind(this,data.name)} text="保存" buttonStyle={{
						        color: "#656565",
						        position: 'absolute',
						        left: '50%',
						        marginLeft: dp(50)
					        }} textStyle={{color: "#656565"}}/>
				        </View>
			        </View>

		        </React.Fragment>
	        )
        }
        else if(questionsLists[pageIndex-1].subTitle != ""){
            const data=questionsLists[pageIndex-1];
            return(
                <React.Fragment>
                    <View style={{marginTop: dp(50)}} key={pageIndex}>
                        <View style={{backgroundColor: '#fff', marginTop: dp(50),height:dp(200)}}>
                            <BackgroundImage source={require('./img/bianhao1.png')} key={3}
                                             style={{width: dp(219), height: dp(98), position: 'absolute', top: 0, left: dp(-20)}}>
                                <Text style={[styles.quesNum, {width:'100%'},{textAlign:'right'},{paddingRight:dp(30)}]}>{this.state.pageIndex}<Text style={{fontSize: font(30)}}>/ 14</Text></Text>
                            </BackgroundImage>
                            <View style={{ width: dp(1500), marginTop: dp(-570), marginLeft: dp(200)}}>
                                <Text style={[styles.questionText,{width:dp(1500),fontSize:font(60),marginTop:dp(20)}]}>
                                    {data.title}
                                </Text>
                                <Text style={[styles.questionText,{width:dp(1500),fontSize:font(40)}]}>
                                    【{data.subTitle}】
                                </Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'center',marginTop:dp(50),marginBottom:dp(50)}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: dp(1500), borderBottomWidth: dp(1), borderBottomColor: '#ddd'}}></View>
                        </View>
                        <View style={{alignItems: 'center',marginTop:dp(20)}}>
                            <RadioButton.RadioButtonGroup
                                style={{
                                    width: dp(1500),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}
                                model={this.state.answers[data.name]}
                                onChange={this.onChange2.bind(this, data.name)}
                            >

                                {data.options.map((item, index) => {
                                    return (
                                        <RadioButton style={{marginLeft: dp(50), marginRight: dp(50), marginTop: dp(20),width:dp(600),marginBottom:dp(30)}} text={item.text}
                                                     key={index} value={item.value}/>)
                                })}

                            </RadioButton.RadioButtonGroup>
                        </View>
                        <View style={{alignItems: 'center', marginTop: dp(140)}}>
                            <PrevButton onPress={this.goPrev} text="上一页"
                                        buttonStyle={{position: 'absolute', left: '50%', marginLeft: dp(-330)}}/>
                            <PrevButton onPress={this.goNext.bind(this,data.name)} text="继续" buttonStyle={{
                                color: "#656565",
                                position: 'absolute',
                                left: '50%',
                                marginLeft: dp(50)
                            }} textStyle={{color: "#656565"}}/>
                        </View>
                    </View>

                </React.Fragment>
            )
        }else{
            const data=questionsLists[pageIndex-1];
            return(
                <React.Fragment>
                    <View style={{marginTop: dp(50)}} key={pageIndex}>
                        <View style={{backgroundColor: '#fff', marginTop: dp(50),height:dp(200)}}>
                            <BackgroundImage source={require('./img/bianhao1.png')} key={3}
                                             style={{width: dp(219), height: dp(98), position: 'absolute', top: 0, left: dp(-20)}}>
                                <Text style={[styles.quesNum, {width:'100%'},{textAlign:'right'},{paddingRight:dp(30)}]}>{this.state.pageIndex}<Text style={{fontSize: font(30)}}>/ 14</Text></Text>
                            </BackgroundImage>
                            <View style={{ width: dp(1500), marginTop: dp(-570), marginLeft: dp(200)}}>
                                <Text style={[styles.questionText,{width:dp(1500),fontSize:font(60),marginTop:dp(70)}]}>
                                    {data.title}
                                </Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'center',marginTop:dp(50),marginBottom:dp(50)}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: dp(1500), borderBottomWidth: dp(1), borderBottomColor: '#ddd'}}></View>
                        </View>
                        <View style={{alignItems: 'center',marginTop:dp(20)}}>
                            <RadioButton.RadioButtonGroup
                                style={{
                                    width: dp(1500),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}
                                model={this.state.answers[data.name]}
                                onChange={this.onChange2.bind(this, data.name)}
                            >

                                {data.options.map((item, index) => {
                                    return (
                                        <RadioButton style={{marginLeft: dp(50), marginRight: dp(50), marginTop: dp(20),width:dp(600),marginBottom:dp(30)}} text={item.text}
                                                     key={index} value={item.value}/>)
                                })}

                            </RadioButton.RadioButtonGroup>
                        </View>
                        <View style={{alignItems: 'center', marginTop: dp(140)}}>
                            <PrevButton onPress={this.goPrev} text="上一页"
                                        buttonStyle={{position: 'absolute', left: '50%', marginLeft: dp(-330)}}/>
                            <PrevButton onPress={this.goNext.bind(this,data.name)} text="继续" buttonStyle={{
                                color: "#656565",
                                position: 'absolute',
                                left: '50%',
                                marginLeft: dp(50)
                            }} textStyle={{color: "#656565"}}/>
                        </View>
                    </View>


                </React.Fragment>
            )
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TopBar onPress={this.onPress} content={{'completeForm':'3','evaluationName':'ADL'}}/>
							<ProgressBar type={3} currentIndex={1}/>
                {this.renderPage()}
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
    table: {
        flexDirection: 'row',
        height: dp(320),
        alignItems:'center',
        marginLeft:dp(240)
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
    tdb:{
        backgroundColor:'rgb(246,246,246)'
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
        fontWeight:'100',
        textAlign:'center'
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

