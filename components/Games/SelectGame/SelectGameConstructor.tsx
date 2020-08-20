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
    isCorrect: true
};

class SelectGamesConstructor {
    getSelectorSquare(...items: Object[]): JSX.Element {
        console.log('/////////////////////')
        let _items: JSX.Element[] = [];
        
        for (let [, value] of Object.entries(items)) {
            for (let [, _value] of Object.entries(value)) {
                _items.push(
                    <View style={styles.rowProps}>
                        <Image source={_value.ref} resizeMode={'center'}/>
                        <Text>{_value.translation}</Text>
                    </View>
                    
                );
            }
        }
        
        return (
            <TouchableOpacity style={[styles.selectorSquare, styles.rowProps]}>
                { _items }
            </TouchableOpacity>
        );
    }

    getGameComponent(items: RequiredParams[]) {
        let _items: JSX.Element[] = [];

        items.forEach(item => _items.push(this.getSelectorSquare(item.items)));

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
            a.getGameComponent([{items: Items.recipes.ApplePie.ingredients, isCorrect: true},
                {items: Items.recipes.Hooch.ingredients, isCorrect: true},
                {items: [Items.clothes.Panama, Items.clothes.TShirt], isCorrect: true},
            ])
        );
    }
}
