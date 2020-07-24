import React, {Component} from "react";
import {View, Image} from "react-native";
import {Constants} from './Constants'
import Svg, { Path, Rect, Line } from "react-native-svg";



export default class Block extends Component{


    constructor(props){
        super(props);
    }

 

    render(){

        return(
            <View style = {{ position : 'absolute' , zIndex : -1}}>
                <Svg height={Constants.MAX_HEIGHT.toString()} width={Constants.MAX_WIDTH.toString()} style = {{ position : 'absolute' , zIndex : -1}}>
                    <Line x1={Constants.MAX_WIDTH/4} y1 = {70*Constants.PSEUDO_PIXEL} x2={Constants.MAX_WIDTH/4} y2 = {20*Constants.PSEUDO_PIXEL} stroke="black" strokeWidth="3"/>
                </Svg>

                <Svg height={Constants.MAX_HEIGHT.toString()} width={Constants.MAX_WIDTH.toString()} style = {{ position : 'absolute' , zIndex : -1}}>
                    <Line x1={Constants.MAX_WIDTH/2} y1 = {70*Constants.PSEUDO_PIXEL} x2={Constants.MAX_WIDTH/2} y2 = {20*Constants.PSEUDO_PIXEL} stroke="black" strokeWidth="3"/>
                </Svg>

                <Svg height={Constants.MAX_HEIGHT.toString()} width={Constants.MAX_WIDTH.toString()} style = {{ position : 'absolute' , zIndex : -1}}>
                    <Line x1={Constants.MAX_WIDTH/4*3} y1 = {70*Constants.PSEUDO_PIXEL} x2={Constants.MAX_WIDTH/4*3} y2 = {20*Constants.PSEUDO_PIXEL} stroke="black" strokeWidth="3"/>
                </Svg>
            </View>
        )
        

    }
}