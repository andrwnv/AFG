import React, { Component } from "react";
import { TextInput, Text, View, TouchableOpacity, KeyboardAvoidingView, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { styles } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import Pictures from 'assets/hero_sprites/Pictures';
import FirestoreAPI from 'api/FirestoreAPI';

/*
*
    @brief: Constructor hero component.

    @info: DRUNK MASTER CODE INCOMIN'.
*
*/

const { width, height } = Dimensions.get('screen');

export default class HeroConstucter extends Component {
    constructor(props: any) {
        super(props);
    }

    _db: FirestoreAPI = new FirestoreAPI();

    state = {
        skinColor: 'white',
        hairColor: 'black',
        eysColor:  'purple',

        currentSpriteName: 'titanda',
        currentSprite: Pictures.get('titanda_white_black_green'),
        characterName: '',
    };

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    setDefaultSprite = () => {
        switch (this.state.currentSpriteName) {
            case 'titanda': {
                this.state.currentSpriteName = 'asuna';
                break;
            }
            case 'asuna': {
                this.state.currentSpriteName = 'titanda';
                break;
            }
        }

        this.setState({currentSprite: Pictures.get(`${this.state.currentSpriteName}_${this.state.skinColor}_${this.state.hairColor}_${this.state.eysColor}`)});
    };

    setSkinColor = () => {
        switch (this.state.skinColor) {
            case 'white': {
                this.state.skinColor = 'alt';
                break;
            }
            case 'alt': {
                this.state.skinColor = 'white';
                break;
            }
        }

        this.setState({currentSprite: Pictures.get(`${this.state.currentSpriteName}_${this.state.skinColor}_${this.state.hairColor}_${this.state.eysColor}`)});
    }

    setHairColor = () => {
        switch (this.state.hairColor) {
            case 'black': {
                this.state.hairColor = 'purple';
                break;
            }
            case 'purple': {
                this.state.hairColor = 'black';
                break;
            }
        }

        this.setState({currentSprite: Pictures.get(`${this.state.currentSpriteName}_${this.state.skinColor}_${this.state.hairColor}_${this.state.eysColor}`)});
    }

    setEysColor = () => {
        switch (this.state.eysColor) {
            case 'purple': {
                this.state.eysColor = 'green';
                break;
            }
            case 'green': {
                this.state.eysColor = 'purple';
                break;
            }
        }

        this.setState({currentSprite: Pictures.get(`${this.state.currentSpriteName}_${this.state.skinColor}_${this.state.hairColor}_${this.state.eysColor}`)});
    }

    render() {
        return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.content}
          >
            <View style = {styles.content}>

                <TouchableOpacity style   = {styles.backButton}
                                    onPress = { () => { Actions.LogIn(); } }>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

                <View style = {styles.header}>
                    <Text style = {styles.headerText}>Настройте внешний вид {'\n'} вашего персонажа!</Text>
                </View>
                
                <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Имя персонажа"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (characterName) => this.setState({characterName}) } />
                </View>

                <View style={{width: '100%', flexDirection: 'row', height: '70%'}}>
                    <View style={{width: '50%', marginTop: height * 0.05}}>
                        <TouchableOpacity onPress = {() => {this.setEysColor(); clickAudioEffect();}} style={[styles.selectButton, {backgroundColor: '#E76BC0'}]}>
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Цвет глаз</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => {this.setSkinColor(); clickAudioEffect();}} style={[styles.selectButton, {backgroundColor: '#128949'}]}>
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Цвет кожи</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => {this.setHairColor(); clickAudioEffect();}} style={[styles.selectButton, {backgroundColor: '#FCB712'}]}>
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Цвет волос</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '50%'}}>
                        <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems:'center'}}
                                          onPress={() => { this.setDefaultSprite(); clickAudioEffect(); }}>
                            <Image source={ this.state.currentSprite } style={{resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{position: 'absolute', top: width * 1.5, width: '100%', height: '100%'}}> 
                        <TouchableOpacity  onPress={() => {
                            AsyncStorage.setItem("spriteName", `${this.state.currentSpriteName}_${this.state.skinColor}_${this.state.hairColor}_${this.state.eysColor}`)
                                .then(() => {
                                    console.log("[AsyncStorage] -> Sprite name saved");
                                })
                                .catch(() => console.log("[AsyncStorage] -> Cant save sprite"));

                            AsyncStorage.setItem("heroName", this.state.characterName)
                                .then(() => {
                                    console.log("[AsyncStorage] -> Hero name updated.");
                                })
                                .catch((err: Error) => {
                                    console.error("[AsyncStorage] -> Cant set hero name!", err);
                                });

                            AsyncStorage.getItem("phoneNumber")
                                .then(key => {
                                    if (key !== null) {
                                        this._db.setUserFields(key, { skinName: `${this.state.currentSpriteName}_${this.state.skinColor}_${this.state.hairColor}_${this.state.eysColor}` })
                                            .then(() => {
                                                console.log("[Firestore] -> User skin name updated!");
                                            })
                                            .catch(err => {
                                                console.error("[Firestore] -> Cant update user skin name!", err);
                                            });

                                        this._db.setUserFields(key, { name: this.state.characterName })
                                            .then(() => {
                                                console.log("[Firestore] -> Hero name updated!");
                                            })
                                            .catch(err => {
                                                console.error("[Firestore] -> Cant update hero name!", err);
                                            });
                                    }
                                })
                                .catch((err: Error) => {
                                    console.error("[AsyncStorage] -> Cant get username!", err);
                                });

                            Actions.GameComponent();
                            clickAudioEffect();
                        }}

                    style={styles.agreeButton}>
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Создать</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </KeyboardAvoidingView>
        );
    }
}
