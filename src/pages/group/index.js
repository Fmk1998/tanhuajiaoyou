import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Group = (props) => {

    return (
        <View style={styles.container}>
            <Text>Group</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default Group;
