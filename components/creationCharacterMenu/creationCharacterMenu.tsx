import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image} from 'react-native';


import * as Font from 'expo-font';

import { styles } from './styles';

const DescriptionText: string = 'some text';
const CharacterName: string ='Name';

export default class StartMenu extends Component {
    constructor(props: any) {
        super(props);
        
        this.state = {
          username: String,
          password: String,
        }

        this.state = {
            fontLoaded: false
        };
    }


     componentDidMount = async() => {
        await Font.loadAsync({
            'Montserrat-Regular':require('../../assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-Black':require('../../assets/fonts/Montserrat-Black.ttf'),
            'Montserrat-Medium':require('../../assets/fonts/Montserrat-Medium.ttf'),
            'Montserrat-Light':require('../../assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Italic':require('../../assets/fonts/Montserrat-Italic.ttf'),
            'Montserrat-Thin':require('../../assets/fonts/Montserrat-Thin.ttf')
        });

        this.setState( { fontLoaded: true } );
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (
            <View style = {styles.content}>

                <TouchableOpacity style   = {styles.backButton}
                                    onPress = { () => {} }>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

                <TouchableOpacity style   = {styles.refreshButton}
                                    onPress = { () => {} }>
                        <Image source={require("../../assets/refresh.png")}/>
                </TouchableOpacity>
 
 
                <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } 
                                    style = {styles.headerButton}/>
                <Text style = {styles.logoText}>PEDO</Text> 

                <View style = {styles.nameContaner}>
                    <Text style = {styles.buttonsText}>{CharacterName}</Text>
                </View>  

                <View style = {styles.descriptionContaner}>
                    <Text>{DescriptionText}</Text>
                </View>  
                

                <TouchableOpacity style   = {styles.playButton}
                                    onPress = { () => this.onClickHandler('patrion')}>
                    <Text style = {styles.buttonsText}>Играть!</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}