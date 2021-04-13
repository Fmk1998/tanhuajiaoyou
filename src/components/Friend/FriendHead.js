import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg from 'react-native-svg';
import {tanhua, near, testSoul} from '../../res/fonts/iconSvg';
import {pxToDp} from '../../utils/stylesKits';
import SvgUri from 'react-native-svg-uri';

const FriendHead = (props) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{alignItems: 'center'}}>
                <View style={{
                    width: pxToDp(60),
                    height: pxToDp(60),
                    borderRadius: pxToDp(35),
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <SvgUri svgXmlData={tanhua} width='40' height='40' fill='#fff'/>
                </View>
                <Text style={{fontSize: pxToDp(18), marginTop: pxToDp(4), color: '#ffffff9a'}}>探花</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
                <View style={{
                    width: pxToDp(60),
                    height: pxToDp(60),
                    borderRadius: pxToDp(35),
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <SvgUri svgXmlData={near} width='40' height='40' fill='#fff'/>
                </View>
                <Text style={{fontSize: pxToDp(18), marginTop: pxToDp(4), color: '#ffffff9a'}}>搜附近</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
                <View style={{
                    width: pxToDp(60),
                    height: pxToDp(60),
                    borderRadius: pxToDp(35),
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <SvgUri svgXmlData={testSoul} width='40' height='40' fill='#fff'/>
                </View>
                <Text style={{fontSize: pxToDp(18), marginTop: pxToDp(4), color: '#ffffff9a'}}>测灵魂</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width:'80%'
    },
});

export default FriendHead;
