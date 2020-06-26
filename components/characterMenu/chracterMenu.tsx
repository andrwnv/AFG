import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';

const DescriptionText: string = 'some text';
const CharacterName: string ='Name';

export default class StartMenu extends Component {
    constructor(props: any) {
        super(props);
    }

    state = {
        username: '',
        password: '',
        modalVisible: false
    };

    setModalVisible = (visible: Boolean) => {
        this.setState({ modalVisible: visible });
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (
            <View style = {styles.content}>
    
                <Modal animationType='fade'
                       transparent={true}
                       visible={this.state.modalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, styles.modalPadding]}>Внимание!</Text>

                            <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.modalPadding]}>
                                <Text style={styles.modalText}>Вы собираетесь удалить вашего персонажа!</Text>
                                <Text style={styles.modalText}> Вы действительно хотите это сделать?</Text>
                            </View>
                            
                            <View style={styles.modalButtonGroup}>
                                <TouchableOpacity
                                    style={[{backgroundColor: '#F37052'}, styles.modalButton]}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <Text style={[{color: 'white'}, styles.modalText]}>Да</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{backgroundColor: '#128949'}, styles.modalButton]}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <Text style={[{color: 'white'}, styles.modalText]}>Нет</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style   = {styles.backButton}
                                  onPress = { () => Actions.LogIn() }>
                        <Image source={require('../../assets/arrow.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style   = {styles.basketButton}
                                    onPress = { () => {this.setModalVisible(!this.state.modalVisible);} }>
                        <Image source={require('../../assets/basket.png')}/>
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
                                    onPress = { () => { Actions.GameComponent(); } }>
                    <Text style = {styles.buttonsText}>Играть!</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}
