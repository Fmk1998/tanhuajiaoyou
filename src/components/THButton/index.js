import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {pxToDp} from '../../utils/stylesKits';

const THButton = (props) => {
    const {
        style={},
        textStyle={},
        children='sign',
        disabled=false
    } = props
    return (
        <TouchableOpacity disabled={disabled} onPress={props.onPress} style={{...styles.touchableOpacity,...style}}>
            <LinearGradient start={{x:0,y:0}} end={{x:1,y:0}} colors={['#9b63cd', '#DD6989']} style={styles.linearGradient}>
                <Text style={{...styles.buttonText,...textStyle}}>
                    {children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        width: '100%',
        height: '100%',
        overflow:'hidden'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: pxToDp(15),
        paddingRight: pxToDp(15),
        borderRadius: pxToDp(5),
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText: {
        fontSize: pxToDp(18),
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default THButton;
