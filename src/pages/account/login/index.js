import React, {useState} from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {validatePhone} from '../../../utils/validator';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE} from '../../../utils/pathMap';
import THButton from '../../../components/THButton';
import THCode from '../../../components/THCodeField';
import Toast from 'teaset/components/Toast/Toast';

const Login = (props) => {

    const [phoneNumber, setPhoneNumber] = React.useState('15812312312'); // 手机号码
    const [phoneValid, setPhoneValid] = React.useState(true); // 手机号码是否合法
    const [showLogin, setShowLogin] = React.useState(true); // 是否显示登录页面
    const [btnText, setBtnText] = React.useState('重获验证码'); // 获取验证码按钮的文本
    const [isCountDowning, setIsCountDowning] = React.useState(false); // 是否在倒计时中
    const [vcodeText, setVcodeText] = useState(''); // 验证码文本

    React.useEffect(() => {
    }, []);

    /**
     * 付民康  2021/3/12
     * desc: 手机号文本改变触发事件
     * @params
     **/
    const phoneNumberChangeText = (phoneNumber) => {
        setPhoneNumber(phoneNumber);
        console.log(phoneNumber);
    };

    /**
     * 付民康  2021/3/12
     * desc: 开启获取验证码的定时器
     * @params
     **/
    const countDown = () => {
        // 判断是否在倒计时中
        if (isCountDowning) {
            return;
        }
        // 进入倒计时
        setIsCountDowning(true);
        // 倒计时长
        let seconds = 5;
        // 重新获取(10s)
        setBtnText(`重新获取(${seconds}s)`);
        // 创建定时器
        let timeId = setInterval(() => {
            seconds--;
            setBtnText((pre) => {
                return `重新获取(${seconds}s)`;
            });
            if (seconds === 0) {
                // 清楚定时器
                clearInterval(timeId);
                setBtnText((pre) => {
                    return `重新获取`;
                });
                // 离开倒计时
                setIsCountDowning(false);
            }
        }, 1000);
    };

    /**
     * 付民康  2021/3/12
     * desc: 手机号码点击完成触发事件
     * @params
     **/
    const phoneNumberSubmitEditing = async () => {
        // 1.对手机号码合法性校验，正则
        if (!validatePhone(phoneNumber)) {
            // 没有通过，设置号码不合法并且提示
            setPhoneValid(false);
        } else {
            setPhoneValid(true);
        }
        /*
        * 2.将手机号码发送到后台的接口，获取验证码 axios
        *     1.发送异步请求的时候 自动显示等待框
        *     2.请求回来 等待框 自动隐藏
        *     3.关键 等待框、axios的拦截器
        * */
        const res = await request.post(ACCOUNT_LOGIN, {
            phone: phoneNumber,
        });
        console.log(res);
        if (res.code == '10000') {
            // 请求成功
            // 3.将登录页面切换成 填写验证码的页面
            setShowLogin(false);
            // 4.开启验证码倒计时定时器
            countDown();
        }
        console.log(phoneNumber);
    };

    /**
     * 付民康  2021/3/15
     * desc: 验证码输入完成事件
     * @params
     **/
    const onVcodeSubmitEditing = async () => {
        /*
        * 1.对验证码做校验——长度检验
        * 2.将手机号和验证码一起发送到后台
        * 3.返回值渲染不同页面
        * 4.新用户->完善个人信息
        * 5.老用户->交友-首页
        * */
        // 1.对验证码做校验——长度检验
        if (vcodeText.length!=6) {
            Toast.message("验证码不正确",2000,"center");
            return;
        }
        // 2.将手机号和验证码一起发送到后台
        const res = await request.post(ACCOUNT_VALIDATEVCODE,{
            phone:phoneNumber,
            vcode:vcodeText
        })
        if (res.code!="10000") {
            Toast.message("验证码不正确",2000,"center");
            console.log(res);
            return;
        }
        if(res.data.isNew) {
            // 新用户
            alert("新用户 跳转到信息页面")
            props.navigation.navigate("Userinfo");
        } else {
            // 老用户
            alert("老用户 跳转到交友页面")
        }
    };

    /**
     * 付民康  2021/3/12
     * desc: 渲染登录页面
     * @params
     **/
    const renderLogin = () => {
        return (
            <View>
                {/*标题*/}
                <View><Text style={styles.contentTitle}>手机号登录注册</Text></View>
                {/*输入框*/}
                <View style={styles.phoneInput}>
                    <Input
                        placeholder='请输入手机号码'
                        // 最大长度
                        maxLength={11}
                        // 输入框键盘的类型
                        keyboardType='phone-pad'
                        // 输入框绑定的值
                        value={phoneNumber}
                        // 输入框内部样式
                        inputStyle={{color: '#333'}}
                        // 文本改变事件
                        onChangeText={phoneNumberChangeText}
                        // 错误提示
                        errorMessage={phoneValid ? '' : '手机号码格式不正确'}
                        // 输入点击完成事件
                        onSubmitEditing={phoneNumberSubmitEditing}
                        // 左侧的icon图标
                        leftIcon={{type: 'font-awesome', name: 'phone', color: '#ccc', size: pxToDp(20)}}
                    />
                </View>
                {/*渐变按钮*/}
                <View>
                    <View>
                        <THButton onPress={phoneNumberSubmitEditing} style={styles.thButton}>获取验证码</THButton>
                    </View>
                </View>
            </View>
        );
    };

    /**
     * 付民康  2021/3/12
     * desc: 渲染填写验证码界面
     * @params
     **/
    const renderVcode = () => {
        return (
            <View>
                {/*标题*/}
                <View><Text style={styles.contentTitle}>输入6位验证码</Text></View>
                {/*小标签*/}
                <View style={{marginTop: pxToDp(15)}}><Text style={styles.vcodeText}>已发到:+86 {phoneNumber}</Text></View>
                {/*验证码输入框*/}
                <View style={{height: pxToDp(60)}}>
                    <THCode onSubmitEditing={onVcodeSubmitEditing} vcodeText={vcodeText} setVcodeText={setVcodeText}/>
                </View>
                <View style={{marginTop: pxToDp(30)}}>
                    <THButton disabled={isCountDowning} onPress={countDown} style={styles.thButton}>{btnText}</THButton>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            {/*状态栏*/}
            <StatusBar backgroundColor="transparent" translucent={true}/>
            {/*背景图片*/}
            <Image style={styles.image} source={require('../../../res/profileBackground.jpg')}/>
            {/*内容*/}
            <View style={styles.content}>
                {/*登录*/}
                {showLogin ? renderLogin() : renderVcode()}
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        /* 200单位 不是像素 而是dp */
        height: pxToDp(200),
    },
    content: {
        padding: pxToDp(20),
    },
    contentTitle: {
        fontSize: pxToDp(25),
        color: '#888',
        fontWeight: 'bold',
    },
    phoneInput: {
        marginTop: pxToDp(30),
    },
    thButton: {
        width: '95%',
        height: pxToDp(40),
        alignSelf: 'center',
        borderRadius: pxToDp(20),
    },
    vcodeText: {
        color: '#888',
    },
});

export default Login;
