import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const colorSpectrum = {
    white: '#ffffff',
    pink:  '#FBC9FF',
    lightPink:  '#F57CFF',
    darkPink: '#C19AC5',
    alternativPink: '#B72FA9',
    black: '#000000',
    orange:'#FF7A00',
    red:'#C34A08'
}


export const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute'
    },

    selectorSquare: {
        backgroundColor: colorSpectrum.lightPink,
        borderRadius: 100,
        width: '100%'
    },

    rowProps: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textStyle: {
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14, 
        textAlign: 'center'
    }
})
