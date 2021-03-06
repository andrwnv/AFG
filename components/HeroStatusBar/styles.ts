import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
    StatusBar: {
        width: '100%', 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: Dimensions.get('screen').height - Dimensions.get('window').height > 25 ? height * 0.08 : height * 0.09,  // Use diff height for devices with notch and without.
        backgroundColor: '#EE8AF0', 
        justifyContent: 'center', 
        alignItems: 'center',
        top: 0,
        flexDirection: 'row',
        display: 'flex', 
    },

    modalContainer_net: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        width: '100%',
        height: '100%'
    },

    modalOkButton: {
        backgroundColor: 'white',
        width: '85%',
        height: '20%',
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#F37052',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    modalTitle_Net: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        marginBottom: 15,
        textAlign: 'center'
    },

    modalOkButtonText: {
        color: '#F37052',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        textAlign: 'center'
    },

    modalView_Net: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: '80%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        textAlign: 'center'
    },

    modalButton: {
        marginLeft: 18,
        marginRight: 18,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    notchPadding: {
        paddingTop: 25,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#EE8AF0',
    },

    StatusBarSubMenu: {
        backgroundColor: '#B72FA9',
        borderRadius: 100,
        width: '60%', 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center',
        top: 0,
        flexDirection: 'row',
        display: 'flex',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },

    iconStyleSubMenu: {
        borderRadius: 100, 
        height: width * 0.1,
        width: width * 0.1, 
        marginLeft: '4.8%', // MAGIC 4.8 )000))
        marginRight: '4.8%',
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor: 'white', 
        borderWidth: 1
    },

    iconStyle: {
        borderRadius: 100, 
        backgroundColor: '#B72FA9',
        height: width * 0.13, // MAGIC 0.13 )000))
        width: width * 0.13, 
        marginLeft: '1%',
        marginRight: '1%',
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 11,
    },

    defaultMargin: {
        marginLeft: '1.5%',
        marginRight: '1.5%'
    }, 

    levelText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24, 
        color: 'white'
    },

    modalContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(52, 52, 52, 0.8)', 
        width: '100%', 
        height: '100%',
        zIndex: 1
    },

    modalView: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: '80%',
        height: '75%', 
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30, 
        marginBottom: 15,
        textAlign: 'center'
    },

    modalSettingItem: {
        borderWidth: 1,
        borderColor: '#E76BC0',
        width: '70%',
        height: '18%',
        borderRadius: 10, 
        marginBottom: 7
    },

    modalSettingsTitleBox: {
        backgroundColor: '#E76BC0',
        height: '50%',
        borderRadius: 8.5,
        justifyContent: 'center'
    }, 

    modalSettingsTitle: {
        color: 'white', 
        fontFamily: 'Montserrat-Medium',
        fontSize: 16, 
        textAlign: 'center'
    },

    modalSettingNumber: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 30, 
        width: '33%', 
        textAlign: 'center'
    },

    modalSettingArrow: {
        width: '33%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    modalExitButton: {
        backgroundColor: 'white', 
        width: '85%', 
        height: '10%', 
        justifyContent: 'center', 
        alignItems:'center', 
        borderColor:'#F37052', 
        borderRadius: 10, 
        borderWidth: 1, 
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    modalExitButtonText: {
        color: '#F37052',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20, 
        textAlign: 'center'
    },

    modalStatePropName: {
        width: '48%', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 16, 
        textAlign: 'left'
    },

    modalStatePropNumber: {
        width: '35%', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 16, 
        textAlign: 'right'
    }
});
