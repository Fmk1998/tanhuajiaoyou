import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import axios from 'axios';

class Geo {
    // 初始化
    async initGeo() {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        }
        await init({
            ios: 'd15e7430546a4db9fb0d9e07aa0fa86e',
            // 安卓端的key
            android: 'd15e7430546a4db9fb0d9e07aa0fa86e',
        });
        return Promise.resolve();
    }

    // 获取当前地理位置
    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            console.log('开始定位');
            Geolocation.getCurrentPosition(({coords}) => {
                resolve(coords);
            }, reject);
        });
    }

    // 根据当前位置调用高德地图的api
    async getCityByLocation() {
        const {longitude, latitude} = await this.getCurrentPosition();
        const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
            // 高德地图web服务的key
            params: {location: `${longitude},${latitude}`, key: 'd6383bbcecdfb2968ebed675923901b4'},
        });
        return Promise.resolve(res.data);
    }
}


export default new Geo();
