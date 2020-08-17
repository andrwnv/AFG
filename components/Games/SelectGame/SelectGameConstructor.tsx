import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native';

import Items      from './Items';
import { styles } from './styles';

class SelectGamesConstructor extends Component {
    constructor(props: any) {
        super(props);
    }

    getSelectoerSquare(): JSX.Element {
        return (
            <TouchableOpacity activeOpacity={1}>
                
            </TouchableOpacity>
        );
    }

    render() {
        // Items.ingredients.Flour;

        return ( 
            <View style = {styles.content}>
                
            </View>
        );
    }
}
