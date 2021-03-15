import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import SvgUri from 'react-native-svg-uri';
import {female, male} from '../../../res/fonts/iconSvg';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

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
         )
     }

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
});

export default Userinfo;
