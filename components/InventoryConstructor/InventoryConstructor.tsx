import React, { Component } from 'react';
import { View, FlatList, Text, ImageBackground, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { styles } from './styles';

const { height } = Dimensions.get('screen');


interface ItemInfo {
    id: number,

    name: string,
    price: number,
    disc: string,
    room: string,

    buff: {
        needBuffName: string,
        buffScale: number,
    },
    debuff: {
        needDebuffName: string,
        debuffScale: number
    }
}


export type ButtonProps = {
    text?: string,
    handler?: (id?: number) => void;
};

export interface IInventoryProps {
    topElemProps?: ButtonProps,
    bottomElemProps: ButtonProps,
    data: ItemInfo[]
}

export class InventoryConstructor extends Component<IInventoryProps> {
    constructor(props: any) {
        super(props);

        this.props = props;

        this._topButtonData = props.topElemProps;
        this._bottomButtonData = props.bottomElemProps;
    }

    props: any;

    state = {
        sections: {
            clothesSection: { pressed: true, name: 'clothes' },
            cleanSection: { pressed: false, name: 'clean' },
            eatSection: { pressed: false, name: 'eat' },
            funSection: { pressed: false, name: 'fun' },

            currPressed: 'clothes',
        },

        warningModalVisible: false,
        infoModalVisible: false
    }

    setSection(propName: string): void {
        clickAudioEffect();

        if ( propName === this.state.sections.currPressed ) {
            return;
        }

        for (let [, value] of Object.entries(this.state.sections)) {
            if ( typeof (value) === 'string' ) {
                continue;
            }

            value.pressed = false;

            if ( value.name === propName ) {
                this.state.sections.currPressed = propName;
                this.setState({ key: { pressed: true, name: propName } });
                value.pressed = true;
            }
        }
    }

    data: ItemInfo[];

    _topButtonData: ButtonProps;
    _bottomButtonData: ButtonProps;

    setWarningModalVisible(visible: Boolean): void {
        this.setState({ warningModalVisible: visible });
    }

    setInfoModalVisible(visible: Boolean): void {
        this.setState({ infoModalVisible: visible });
    }

    _renderTopElement(itemInfo: ItemInfo): JSX.Element {
        if ( this._topButtonData === undefined ) {
            return (
                <View style = {{ height: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style = {styles.priceText}>{`${itemInfo.price}P`}</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity style = {{
                backgroundColor: '#E3463C',
                width: '100%',
                marginBottom: '21%',
                height: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 10
            }}
                              onPress = {() => {
                                  if ( this._topButtonData.handler !== undefined ) {
                                      console.log(itemInfo);
                                      this._topButtonData.handler(itemInfo.id);
                                  }

                                  clickAudioEffect();
                              }}>
                <Text style = {[styles.priceText, { fontSize: 16 }]}>{this._topButtonData.text}</Text>
            </TouchableOpacity>
        );
    }

    _renderBottomElement(itemInfo: ItemInfo): JSX.Element {
        return (
            <TouchableOpacity style = {{
                backgroundColor: 'yellow',
                width: '100%',
                height: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 10
            }}
                              onPress = {() => {
                                  if ( this._topButtonData !== undefined ) {
                                      this._modalInfoView(itemInfo); // update container before draw it....
                                      this.setInfoModalVisible( !this.state.infoModalVisible);
                                  }
                                  else {
                                      this.setWarningModalVisible( !this.state.warningModalVisible);
                                  }

                                  if ( this._bottomButtonData.handler !== undefined ) {
                                      this._bottomButtonData.handler(itemInfo.id);
                                  }

                                  clickAudioEffect();
                              }}>
                <Text style = {[styles.priceText, { fontSize: 16 }]}>{this._bottomButtonData.text}</Text>
            </TouchableOpacity>
        );
    }

    _modalInfoContainer: JSX.Element;

    _modalInfoView(itemInfo: ItemInfo): void {
        this._modalInfoContainer = (
            <View style = {styles.modalContainer}>
                <View style = {styles.modalContainer}>
                    <View style = {[styles.modalView, { height: '35%' }]}>
                        <Text style = {[styles.modalTitle]}>{itemInfo.name.toLocaleUpperCase()}</Text>

                        <View style = {{ flexDirection: 'row', marginBottom: 30 }}>
                            <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style = {{ textAlign: 'center' }}>{itemInfo.disc}</Text>
                            </View>
                        </View>
                        <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style = {styles.modalStatePropName}>Стоимость: </Text>
                            <Text style = {styles.modalStatePropNumber}>{itemInfo.price.toString()}P</Text>
                        </View>
                        <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style = {styles.modalStatePropName}>Бафы: </Text>
                            <Text style = {styles.modalStatePropNumber}>{itemInfo.buff.buffScale.toString()}</Text>
                        </View>

                        <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style = {styles.modalStatePropName}>Дебафы: </Text>
                            <Text style = {styles.modalStatePropNumber}>{itemInfo.debuff?.debuffScale.toString()}</Text>
                        </View>

                        <TouchableOpacity style = {[styles.modalExitButton, { height: '25%' }]} onPress = {() => {
                            this.setState({ infoModalVisible: false });
                            clickAudioEffect();
                        }}>
                            <Text style = {styles.modalExitButtonText}>Назад</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <ImageBackground source = {require('./assets/background.png')} style = {styles.container}>
                <View
                    style = {[styles.selector, Dimensions.get('screen').height - Dimensions.get('window').height > 25 ? styles.notchPadding : null]}>

                    <Modal animationType = 'fade'
                           transparent = {true}
                           visible = {this.state.infoModalVisible}>
                        {this._modalInfoContainer}
                    </Modal>

                    <TouchableOpacity
                        style = {this.state.sections.clothesSection.pressed ? [styles.pressedSection, { flexDirection: 'row' }] : styles.defaultSection}
                        onPress = {() => {
                            this.setSection('clothes');
                        }}>
                        <Image source = {require('./assets/clothes_icon.png')} />
                        <Text style = {[{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 20,
                            paddingLeft: 30
                        }, this.state.sections.clothesSection.pressed ? null : { display: 'none' }]}>Одежда</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {this.state.sections.cleanSection.pressed ? [styles.pressedSection, { flexDirection: 'row' }] : styles.defaultSection}
                        onPress = {() => {
                            this.setSection('clean');
                        }}>
                        <Image source = {require('./assets/clean_icon.png')} />
                        <Text style = {[{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 20,
                            paddingLeft: 30
                        }, this.state.sections.cleanSection.pressed ? null : { display: 'none' }]}>Чистота</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {this.state.sections.eatSection.pressed ? [styles.pressedSection, { flexDirection: 'row' }] : styles.defaultSection}
                        onPress = {() => {
                            this.setSection('eat');
                        }}>
                        <Image source = {require('./assets/eat_icon.png')} />
                        <Text style = {[{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 20,
                            paddingLeft: 30
                        }, this.state.sections.eatSection.pressed ? null : { display: 'none' }]}>Еда</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {this.state.sections.funSection.pressed ? [styles.pressedSection, { flexDirection: 'row' }] : styles.defaultSection}
                        onPress = {() => {
                            this.setSection('fun');
                        }}>
                        <Image source = {require('./assets/fun_icon.png')} />
                        <Text style = {[{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 20,
                            paddingLeft: 30
                        }, this.state.sections.funSection.pressed ? null : { display: 'none' }]}>Разлечения</Text>
                    </TouchableOpacity>
                </View>

                <View style = {{ height: '75%' }}>
                    <FlatList
                        data = {this.props.data}
                        contentContainerStyle = {styles.listView}
                        showsVerticalScrollIndicator = {false}
                        renderItem = {({ item }) => <View style = {{
                            flexDirection: 'row',
                            width: '95%',
                            height: height * 0.13,
                            marginTop: 15,
                            backgroundColor: '#F57CFF',
                            borderRadius: 10
                        }}>
                            <View style = {{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source = {require('./assets/balloon.png')} />
                            </View>
                            <View style = {{ width: '50%', justifyContent: 'center' }}>
                                <Text style = {styles.titleText}>{item.name}</Text>
                                <Text style = {styles.descriprionText}>{item.disc}</Text>
                                <Text
                                    style = {styles.effectsText}>{`-${item.debuff.debuffScale} ${item.debuff.needDebuffName} +${item.buff.buffScale} ${item.buff.needBuffName}`}</Text>
                            </View>
                            <View style = {{ width: '30%' }}>
                                {this._renderTopElement(item)}
                                {this._renderBottomElement(item)}
                            </View>
                        </View>
                        } />
                </View>

                <View style = {{ width: '100%', height: '15%', justifyContent: 'center', alignContent: 'center' }}>
                    <TouchableOpacity onPress = {() => {
                        Actions.GameComponent();
                        clickAudioEffect();
                    }}
                                      style = {styles.backButton}>
                        <Text style = {{ color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17 }}>Назад</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}
