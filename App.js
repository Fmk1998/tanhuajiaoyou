import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import Nav from './src/navigation';
import Geo from './src/utils/Geo';
import {Provider} from 'mobx-react';
import RootStore from './src/mobx/index'

const App = (props) => {

    const [isInitGeo, setIsInitGeo] = React.useState(false); // 是否初始化完成高德地图

    React.useEffect(() => {
        // 获取缓存中的用户数据
        getUserInfo();
        // 高德地图api初始化
        initGeo();
        // 极光初始化

    }, []);

    // 获取缓存中的用户数据
    const getUserInfo = async () => {
        const strUserInfo = await AsyncStorage.getItem("userinfo");
        const userinfo = strUserInfo?JSON.parse(strUserInfo):{};
        // 判断 有没有token
        if (userinfo.token) {
            // 把缓存中的数据存到mobx中
            RootStore.setUserInfo(userinfo.mobile,userinfo.token,userinfo.userId);
        }
    }

    // 初始化地理api
    const initGeo = async () => {
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
