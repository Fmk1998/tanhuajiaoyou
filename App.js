import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Nav from './src/navigation';
import Geo from './src/utils/Geo';

const App = (props) => {

    React.useEffect(async ()=>{
        const res = await Geo.getCityByLocation();
        console.log(res);
    },[]);

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
