import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import SvgUri from 'react-native-svg-uri';
import {female, male} from '../../../res/fonts/iconSvg';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Geo from '../../../utils/Geo';
import Picker from 'react-native-picker';
import CityJson from '../../../res/citys.json';
import THButton from '../../../components/THButton';
import Toast from 'teaset/components/Toast/Toast';
import ImagePicker from 'react-native-image-crop-picker';
import {Overlay} from 'teaset';
import {inject, observer} from 'mobx-react';
import request from '../../../utils/request';
import {ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO, ACCOUNT_VALIDATEVCODE} from '../../../utils/pathMap';

const Userinfo = (props) => {
    const dateNow = new Date();
    const currentDate = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate() + 1}`;
    const [nickname, setNickname] = React.useState('张三'); // 名称
    const [gender, setGender] = React.useState('男'); // 性别
    const [birthday, setBirthday] = React.useState('2019-12-26'); // 生日
    const [city, setCity] = React.useState('武汉市'); // 城市
    const [header, setHeader] = React.useState('/upload/13828459787.jpg'); // 头像
    const [lng, setLng] = React.useState('/upload/13828459787.jpg'); // 经度
    const [lat, setLat] = React.useState('/upload/13828459787.jpg'); // 纬度
    const [address, setAddress] = React.useState('/upload/13828459787.jpg'); // 详细的地址

    React.useEffect(() => {
        init();
    }, []);

    // 初始化调用高德地图api
    const init = async () => {
        const res = await Geo.getCityByLocation();
        console.log(res);
        if (res) {
            setAddress(res.regeocode.formatted_address);
            setCity(res.addressComponent.city.replace('市', ''));
            setLng(res.regeocode.addressComponent.streetNumber.location.split(',')[0]);
            setLat(res.regeocode.addressComponent.streetNumber.location.split(',')[1]);
        }
    };

    /**
     * 付民康  2021/3/15
     * desc: 选择性别点击事件
     * @params
     **/
    const chooseGender = (gender) => {
        if (gender) {
            setGender(gender);
        }
    };

    /**
     * 付民康  2021/3/16
     * desc: 选择城市事件
     * @params
     **/
    const showCityPicker = () => {
        console.log('引入地区');
        // 1. 初始化组件
        Picker.init({
            // pickerData 要显示的数据 全国城市数据
            pickerData: CityJson,
            // 默认选择哪个数据
            selectedValue: ['北京', '北京'],
            wheelFlex: [1, 1, 0], // 显示省和市
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择城市',
            onPickerConfirm: data => {
                // data =  [广东，广州，天河]
                setCity(data[1]);
            },
        });
        // 2. 显示组件
        Picker.show();
    };

    /**
     * 付民康  2021/3/16
     * desc: 点击设置头像按钮
     * @params
     **/
    const chooseHeaderImg = async () => {
        // 1 校验 用户的昵称 生日 当前地址
        if (!nickname || !birthday || !city) {
            Toast.sad('昵称或者生日或者当前地址不合法', 2000, 'center');
            return;
        }
        // 2 使用图片裁剪插件
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        });
        console.log(image);
        // 3 将选择好的图片 上传到 后台

        // 显示审核中的效果
        let overlayViewRef = null;
        let overlayView = (
            <Overlay.View
                style={{flex: 1, backgroundColor: '#000'}}
                modal={true}
                overlayOpacity={0}
                ref={v => overlayViewRef = v}
            >
                <View style={{
                    marginTop: pxToDp(30),
                    alignSelf: 'center',
                    width: pxToDp(334),
                    height: pxToDp(334),
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, zIndex: 100}}
                           source={require('../../../res/scan.gif')}/>
                    <Image style={{width: '60%', height: '60%'}}
                           source={{uri: image.path}}/>
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);

        // 4 将所有的数据提交到后台->完成 信息填写
        const res0 = await uploadHeadImg(image);
        // 打开调试模式-调试工具，对网络会拦截处理，导致一些请求失败
        // 不要打开任何调试工具 使用控制台即可
        console.log(res0);
        if (res0.code !== '10000') {
            // 失败
            // 关闭头像审核浮层
            overlayViewRef.close();
            return;
        }
        // 关闭头像审核浮层
        overlayViewRef.close();
        // 5 成功 执行极光的注册 极光的登录（在线聊天功能）
        let params = {
            nickname,
            gender,
            birthday,
            city,
            lng,
            lat,
            address
        };
        params.header=res0.data.headImgPath;
        console.log(params);
        const res1 = await request.privatePost(ACCOUNT_REGINFO,params);
        console.log(res1);
    };

    /**
     * 付民康  2021/3/29
     * desc: 上传头像
     * @params
     **/
    const uploadHeadImg = (image) => {
        let formData = new FormData();
        formData.append('headPhoto', {
            // 本地图片的地址
            uri: image.path,
            // 本地图片的类型
            type: image.mime,
            // 图片的名称
            name: image.path.split('/').pop(),
        });
        // 执行头像上传
        return request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    /**
     * 付民康  2021/3/15
     * desc: 渲染日期选择器
     * @params
     **/
    const renderDatepicker = () => {
        return (
            <DatePicker
                androidMode={'spinner'}
                style={{width: '100%'}}
                date={birthday}
                mode="date"
                placeholder="设置生日"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate={currentDate}
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                    dateIcon: {
                        display: 'none',
                    },
                    dateInput: {
                        marginLeft: pxToDp(10),
                        borderWidth: 0,
                        borderBottomWidth: pxToDp(1.1),
                        alignItems: 'flex-start',
                        paddingLeft: pxToDp(2),
                    },
                    placeholderTextL: {
                        fontSize: pxToDp(18),
                        color: '#afafaf',
                    },
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(birthday) => {
                    setBirthday(birthday);
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* 1 标题 */}
            <Text style={styles.title}>填写资料</Text>
            <Text style={styles.title}>提升自己的可见度</Text>
            {/* 2 性别 */}
            <View style={styles.sex}>
                <View style={styles.sexContainer}>
                    <TouchableOpacity onPress={() => chooseGender('男')} style={{
                        ...styles.sexTouchable,
                        backgroundColor: gender === '男' ? 'red' : '#eee',
                    }}>
                        <SvgUri svgXmlData={male} width={'36'} height={'36'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => chooseGender('女')} style={{
                        ...styles.sexTouchable,
                        backgroundColor: gender === '女' ? 'red' : '#eee',
                    }}>
                        <SvgUri svgXmlData={female} width={'36'} height={'36'}/>
                    </TouchableOpacity>
                </View>
            </View>
            {/* 3 昵称 */}
            <Input value={nickname} placeholder={'设置昵称'} onChangeText={(nickname) => setNickname(nickname)}/>
            {/* 4 日期 */}
            <View>
                {renderDatepicker()}
            </View>
            {/* 5 地址 */}
            <View style={styles.touchableOpacityBox}>
                <TouchableOpacity onPress={showCityPicker}>
                    <Input value={'当前定位:' + city}
                           inputStyle={{color: '#666'}}
                           disabled={true}
                    />
                </TouchableOpacity>
            </View>
            {/* 6 选择头像 */}
            <View>
                <THButton onPress={chooseHeaderImg} style={styles.setHeader}>设置头像</THButton>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: pxToDp(20),
    },
    title: {
        fontSize: pxToDp(20),
        color: '#666',
        fontWeight: 'bold',
    },
    sex: {
        marginTop: pxToDp(20),
    },
    sexContainer: {
        width: '60%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    sexTouchable: {
        width: pxToDp(60),
        height: pxToDp(60),
        borderRadius: pxToDp(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacityBox: {
        marginTop: pxToDp(20),
    },
    setHeader: {
        height: pxToDp(40),
        borderRadius: pxToDp(20),
        // alignSelf: 'center'
    },
});

export default inject('RootStore')(observer(Userinfo));
