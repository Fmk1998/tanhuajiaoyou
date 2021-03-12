import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Nav from './src/navigation';

const App = (props) => {

    return (
        <View style={styles.container}>
            <Nav></Nav>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex:1
    }
});
export default App;
