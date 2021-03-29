import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Nav from './src/navigation';
import Geo from './src/utils/Geo';
import {Provider} from 'mobx-react';
import RootStore from './src/mobx/index'

const App = (props) => {

    const [isInitGeo, setIsInitGeo] = React.useState(false); // 是否初始化完成高德地图

    React.useEffect(() => {
        init();
    }, []);

    // 初始化地理api
    const init = async () => {
        await Geo.initGeo();
        setIsInitGeo(true);
    };

    return (
        <View style={styles.container}>
            <Provider RootStore={RootStore}>
            {isInitGeo ? <Nav></Nav> : <></>}
            </Provider>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default App;
