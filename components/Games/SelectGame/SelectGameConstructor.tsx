import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import Items      from './Items';
import { styles } from './styles';

type RequiredParams = {
    items:
        {
            translation: string;
            ref: any;
        }[]
    ,
    isCorrect: boolean
};

class SelectGamesConstructor {
    getSelectorSquare(isCorrect: boolean, ...items: Object[]): JSX.Element {
        let _items: JSX.Element[] = [];
        
        for (let [, value] of Object.entries(items)) {
            for (let [, _value] of Object.entries(value)) {
                _items.push(
                    <View style={[styles.rowProps, {flex: 1}]}>
                            <Image source={_value.ref} style={{flex: 3, height: '10%'}}/>
                            <Text style={[styles.content, {flex: 7, textAlign: 'center'}]}>{_value.translation}</Text>
                    </View>
                    );
            }
        }
        
        return (
            <TouchableOpacity style={[styles.selectorSquare, styles.rowProps]} onPress={() => {
                if (isCorrect)
                    console.log("Congratulation");
            }}>
                { _items }
            </TouchableOpacity>
        );
    }

    getGameComponent(items: RequiredParams[]) {
        let _items: JSX.Element[] = [];

        items.forEach(item => _items.push(this.getSelectorSquare(item.isCorrect, item.items)));

        return ( 
            <View style = {[styles.content, {backgroundColor: 'red'}]}>
                { _items }
            </View>
        );
    }
}

export class Test extends Component {
    render() {
        var a = new SelectGamesConstructor();
        return (
            <View style={styles.content}>
                {
                    a.getGameComponent([
                        {items: Items.recipes.ApplePie.ingredients, isCorrect: true},
                        {items: Items.recipes.Hooch.ingredients, isCorrect: false},
                        {items: [Items.clothes.Panama, Items.clothes.TShirt], isCorrect: false},
                    ])
                }
            </View>
        )
    }
}
