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
export class Named extends React.Component{
	constructor(props){
		super(props);
		this.state= {
            questionType: this.props.questionType,
            questionIndex: this.props.questionIndex,
            answers:{
            }
		}
    }
}
