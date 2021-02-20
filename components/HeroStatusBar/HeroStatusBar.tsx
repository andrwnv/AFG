import React, { Component } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet, Dimensions, Modal, BackHandler } from 'react-native';
import * as Brightness from 'expo-brightness';

import BackgroundAudioController from 'endpoints/BackgroundAudioController';
import { clickAudioEffect, setAudioEffectVolume } from 'endpoints/AudioEffects';

import { styles } from './styles';
import AsyncStorage from "@react-native-community/async-storage";
import FirestoreAPI from "api/FirestoreAPI";

import EventTimersManager from "endpoints/EventTimersManager";

/*
 *
 @brief: Status bar to display characters needs, such as sleep, food, lvl and etc.
 *
 */


interface IHeroStatusBar {
    handler: Function,
    musicController: BackgroundAudioController
}

export default class HeroStatusBar extends Component<IHeroStatusBar> {
    firestore: FirestoreAPI;

    _musicController: BackgroundAudioController;
    _defaultBrightness: number;
    _currentBrightness: number;

    state = {
        _icons: {
            satiety: { link: require('./assets/satiety.png'), currentState: 100, name: 'Голод' },
            sleep: { link: require('./assets/sleep.png'), currentState: 100, name: 'Бодрость' },
            cleanness: { link: require('./assets/cleanness.png'), currentState: 100, name: 'Чистота' },
            mood: { link: require('./assets/mood.png'), currentState: 100, name: 'Настроение' },
        },

        _money: { link: require('./assets/money.png'), currentState: 0, name: 'Монетки' },

        settingsModalVisible: false,
        statsModalVisible: false,
        currentBrightness: this._defaultBrightness,
        soundVolume: 1.0,
        effectsVolume: 1.0,
        level: { number: 1, exp: 1000 }
    };

    constructor(props: any) {
        super(props);
        props.handler();

        this._musicController = props.musicController;

        this.firestore = new FirestoreAPI();

        this.firestore.getUserFields("+79991774634")
            .then(async(data) => {
                if(data == undefined) {
                    return;
                }

                await AsyncStorage.setItem("eatPoints", String(data.eatPoints));
                await AsyncStorage.setItem("clearPoints", String(data.clearPoints));
                await AsyncStorage.setItem("moodPoints", String(data.moodPoints));
                await AsyncStorage.setItem("sleepPoints", String(data.sleepPoints));

                this.setState({
                    _icons: {
                        ...this.state._icons, satiety: {
                            ...this.state._icons.satiety, currentState: data.eatPoints
                        }, sleep: {
                            ...this.state._icons.sleep, currentState: data.sleepPoints
                        }, cleanness: {
                            ...this.state._icons.cleanness, currentState: data.clearPoints
                        }, mood: {
                            ...this.state._icons.mood, currentState: data.moodPoints
                        },
                    }
                });
            });

        EventTimersManager.initTimers(async() => {
            AsyncStorage.getItem("clearPoints")
                .then((cleanPoint) => {
                    console.log("clear Point now -> " + cleanPoint);

                    if (cleanPoint != null && +cleanPoint > 0) {
                        AsyncStorage.setItem("clearPoints", String(+cleanPoint - 10));
                        AsyncStorage.getItem("clearPoints").then(res => console.log(res));

                        this.setState({
                            _icons: {
                                ...this.state._icons,
                                cleanness: { ...this.state._icons.cleanness, currentState: +cleanPoint - 10 }
                            }
                        });

                        // const _firestore = new FirestoreAPI();
                        this.firestore.setUserFields("+79991774634", { clearPoints: +cleanPoint - 10 });
                    }
                });
        }, async() => {
            AsyncStorage.getItem("sleepPoints")
                .then((sleepPoints) => {
                    console.log("sleep Point now -> " + sleepPoints);

                    if (sleepPoints != null && +sleepPoints > 0) {
                        AsyncStorage.setItem("sleepPoints", String(+sleepPoints - 10));
                        AsyncStorage.getItem("sleepPoints").then(res => console.log(res));

                        this.setState({
                            _icons: {
                                ...this.state._icons,
                                sleep: { ...this.state._icons.sleep, currentState: +sleepPoints - 10 }
                            }
                        });

                        this.firestore.setUserFields("+79991774634", { sleepPoints: +sleepPoints - 10 });
                    }
                });
        }, async() => {
            AsyncStorage.getItem("moodPoints")
                .then((moodPoints) => {
                    console.log("mood Point now -> " + moodPoints);

                    if (moodPoints != null && +moodPoints > 0) {
                        AsyncStorage.setItem("moodPoints", String(+moodPoints - 10));
                        AsyncStorage.getItem("moodPoints").then(res => console.log(res));

                        this.setState({
                            _icons: {
                                ...this.state._icons,
                                mood: { ...this.state._icons.mood, currentState: +moodPoints - 10 }
                            }
                        });

                        this.firestore.setUserFields("+79991774634", { moodPoints: +moodPoints - 10 });
                    }
                });
        }, async() => {
            AsyncStorage.getItem("eatPoints")
                .then((eatPoint) => {
                    console.log("eat Point now -> " + eatPoint);

                    if (eatPoint != null && +eatPoint > 0) {
                        AsyncStorage.setItem("eatPoints", String(+eatPoint - 10));
                        AsyncStorage.getItem("eatPoints").then(res => console.log(res));

                        this.setState({
                            _icons: {
                                ...this.state._icons,
                                satiety: { ...this.state._icons.satiety, currentState: +eatPoint - 10 }
                            }
                        });

                        this.firestore.setUserFields("+79991774634", { eatPoints: +eatPoint - 10 });
                    }
                });
        });
    }

    async componentDidMount() {
        const { status } = await Brightness.requestPermissionsAsync();
        if(status === 'granted') {
            Brightness.getSystemBrightnessAsync().then(res => {
                this._defaultBrightness = res;
                this._currentBrightness = res;
            });
        }
    }

    getCurrentColor(currentStateNum: number) {
        if(currentStateNum <= 50) {
            return StyleSheet.create({ color: { backgroundColor: '#E23535' } });
        } else if(currentStateNum > 50 && currentStateNum < 80) {
            return StyleSheet.create({ color: { backgroundColor: '#FCB712' } });
        } else {
            return StyleSheet.create({ color: { backgroundColor: '#4EB734' } });
        }
    };

    _settingsModal(): JSX.Element {
        return (<Modal animationType='fade'
                       transparent={true}
                       visible={this.state.settingsModalVisible}
                       onRequestClose={() => {
                           this.setState({ settingsModalVisible: false })
                       }}>
            <TouchableOpacity style={styles.modalContainer} onPress={() => {
                this.setState({ settingsModalVisible: false })
            }} activeOpacity={1}>
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                    <Text style={[styles.modalTitle]}>Настройки</Text>

                    <View style={styles.modalSettingItem}>
                        <View style={styles.modalSettingsTitleBox}>
                            <Text style={[styles.modalSettingsTitle]}>Яркость</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <TouchableOpacity style={styles.modalSettingArrow} onPress={async() => {
                                const { status } = await Brightness.requestPermissionsAsync();
                                if(status === 'granted') {
                                    // DONT TOUCH IF STATEMENT
                                    if(this._currentBrightness >= 0.01 && this._currentBrightness <= 1.1) {
                                        this._currentBrightness = parseFloat((this._currentBrightness - 0.1).toFixed(1));
                                        await Brightness.setSystemBrightnessAsync(this._currentBrightness);
                                        this.setState({ currentBrightness: this._currentBrightness });
                                    }
                                }
                                clickAudioEffect();
                            }}
                                              children={<Image
                                                  source={require('./assets/modalFiles/arrow-left.png')}/>}/>

                            <Text style={styles.modalSettingNumber}>{~~(this._currentBrightness * 100)}</Text>
                            <TouchableOpacity style={styles.modalSettingArrow} onPress={async() => {
                                const { status } = await Brightness.requestPermissionsAsync();
                                if(status === 'granted') {
                                    // DONT TOUCH IF STATEMENT
                                    if(this._currentBrightness >= 0 && this._currentBrightness <= 0.9) {
                                        this._currentBrightness = parseFloat((this._currentBrightness + 0.1).toFixed(1));
                                        await Brightness.setSystemBrightnessAsync(this._currentBrightness);
                                        this.setState({ currentBrightness: this._currentBrightness });
                                    }
                                }
                                clickAudioEffect();
                            }} children={<Image source={require('./assets/modalFiles/arrow-right.png')}/>}/>
                        </View>
                    </View>

                    <View style={styles.modalSettingItem}>
                        <View style={styles.modalSettingsTitleBox}>
                            <Text style={[styles.modalSettingsTitle]}>Громкость эффектов</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <TouchableOpacity style={styles.modalSettingArrow} onPress={async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = this.state.effectsVolume;
                                if(volume >= 0.01 && volume <= 1.1) {
                                    volume = parseFloat((volume - 0.1).toFixed(1));
                                    this.setState({ effectsVolume: volume });
                                    await setAudioEffectVolume(volume);
                                }

                                clickAudioEffect();
                            }} children={<Image source={require('./assets/modalFiles/arrow-left.png')}/>}/>
                            <Text style={styles.modalSettingNumber}>{this.state.effectsVolume * 100}</Text>
                            <TouchableOpacity style={styles.modalSettingArrow} onPress={async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = this.state.effectsVolume;
                                if(volume >= 0 && volume <= 0.9) {
                                    volume = parseFloat((volume + 0.1).toFixed(1));
                                    this.setState({ effectsVolume: volume });
                                    await setAudioEffectVolume(volume);
                                }

                                clickAudioEffect();
                            }} children={<Image source={require('./assets/modalFiles/arrow-right.png')}/>}/>
                        </View>
                    </View>

                    <View style={styles.modalSettingItem}>
                        <View style={styles.modalSettingsTitleBox}>
                            <Text style={[styles.modalSettingsTitle]}>Громкость музыки</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <TouchableOpacity style={styles.modalSettingArrow} onPress={async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = this.state.soundVolume;
                                if(volume >= 0.01 && volume <= 1.1) {
                                    volume = parseFloat((volume - 0.1).toFixed(1));
                                    this.setState({ soundVolume: volume });
                                    this._musicController.setPlaybackVolume(volume);
                                }

                                clickAudioEffect();
                            }} children={<Image source={require('./assets/modalFiles/arrow-left.png')}/>}/>
                            <Text style={styles.modalSettingNumber}>{this.state.soundVolume * 100}</Text>
                            <TouchableOpacity style={styles.modalSettingArrow} onPress={async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = this.state.soundVolume;
                                if(volume >= 0 && volume <= 0.9) {
                                    volume = parseFloat((volume + 0.1).toFixed(1));
                                    this.setState({ soundVolume: volume });
                                    this._musicController.setPlaybackVolume(volume);
                                }

                                clickAudioEffect();
                            }} children={<Image source={require('./assets/modalFiles/arrow-right.png')}/>}/>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.modalExitButton} onPress={() => {
                        clickAudioEffect();
                        BackHandler.exitApp();
                    }}>
                        <Text style={styles.modalExitButtonText}>кароче типа выйти</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>);
    }

    _statsModal(statsItems: JSX.Element[]): JSX.Element {
        return (<Modal animationType='fade'
                       transparent={true}
                       visible={this.state.statsModalVisible}
                       onRequestClose={() => {
                           this.setState({ statsModalVisible: false })
                       }}>
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => {
                this.setState({ statsModalVisible: false })
            }}>
                <TouchableOpacity style={[styles.modalView, { height: '87%' }]} activeOpacity={1}>
                    <Text style={[styles.modalTitle]}>Состояние {"\n"} героя</Text>

                    <View style={{ justifyContent: "center", alignItems: 'center' }}>{statsItems}</View>

                    <TouchableOpacity style={styles.modalExitButton} onPress={() => {
                        this.setState({ statsModalVisible: false });
                        clickAudioEffect();
                    }}>
                        <Text style={styles.modalExitButtonText}>Назад</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>);
    }

    render(): JSX.Element {
        let statusBarItems: JSX.Element[] = [];

        for(let [key, value] of Object.entries(this.state._icons)) {
            statusBarItems.push(<TouchableOpacity onPress={() => {
            }}
                                                  style={[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color]}
                                                  activeOpacity={1}
                                                  key={key}>
                <Image source={value.link}/>
            </TouchableOpacity>);
        }

        let statsItems: JSX.Element[] = [];

        for(let [key, value] of Object.entries(this.state._icons)) {
            statsItems.push(<View style={{ flexDirection: 'row', marginBottom: 30 }} key={key}>
                <View
                    style={[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color, { marginRight: 0 }]}>
                    <Image source={value.link}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.modalStatePropName}>{value.name}: </Text>
                    <Text style={styles.modalStatePropNumber}>{value.currentState}%</Text>
                </View>
            </View>);
        }

        statsItems.push(<View style={{ flexDirection: 'row', marginBottom: 30 }} key={123}>
            <View style={[styles.iconStyleSubMenu, { marginRight: 0 }]}>
                <Image source={this.state._money.link}/>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                <Text style={styles.modalStatePropName}>{this.state._money.name}: </Text>
                <Text style={styles.modalStatePropNumber}>{this.state._money.currentState}</Text>
            </View>
        </View>);

        statsItems.push(<View style={{ flexDirection: 'row' }} key={124}>
            <View style={[styles.iconStyleSubMenu, { marginRight: 0 }]}>
                <Image source={require('./assets/lvl-icon.png')}/>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                <Text style={styles.modalStatePropName}>Уровень {this.state.level.number}: </Text>
                <Text style={styles.modalStatePropNumber}>{this.state.level.exp} exp</Text>
            </View>
        </View>);

        return (<View
            style={Dimensions.get('screen').height - Dimensions.get('window').height > 25 ? styles.notchPadding : null}>
            {this._settingsModal()}
            {this._statsModal(statsItems)}

            <View style={styles.StatusBar}>
                <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]} onPress={() => {
                    this.setState({ statsModalVisible: true });
                    clickAudioEffect();
                }}>
                    <Text style={styles.levelText}>{this.state.level.number}</Text>
                </TouchableOpacity>

                <View style={[styles.StatusBarSubMenu, styles.defaultMargin]}>
                    {statusBarItems}
                </View>

                <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]} onPress={() => {
                    this.setState({ settingsModalVisible: true });
                }}>
                    <Image source={require('./assets/settings.png')}/>
                </TouchableOpacity>
            </View>
        </View>);
    }
}
