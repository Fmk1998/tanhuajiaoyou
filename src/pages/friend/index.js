import React from 'react';
import {View, Text, StyleSheet,StatusBar} from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {pxToDp} from '../../utils/stylesKits';
import FriendHead from '../../components/Friend/FriendHead';

const Friend = (props) => {

    return (
        <HeaderImageScrollView
            maxHeight={pxToDp(130)}
            minHeight={pxToDp(44)}
            headerImage={require('../../res/headfriend.png')}
            renderForeground={() => (
                <View style={{height: pxToDp(130), justifyContent: 'center', alignItems: 'center'}}>
                    <StatusBar backgroundColor={'transparent'} translucent={true} />
                    <FriendHead/>
                </View>
            )}
        >
            <View style={{height: 1000}}>

            </View>
        </HeaderImageScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Friend;
