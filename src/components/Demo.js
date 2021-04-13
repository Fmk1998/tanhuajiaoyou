import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

// import JMessage from "jmessage-react-plugin"

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        color: '#7d53ea',
    },
    focusCell: {
        borderColor: '#7d53ea',
    },
});

const CELL_COUNT = 6;

const Demo = () => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    React.useEffect(() => {
        // JMessage.init({
        //     'appkey': 'a50ee9e650224722fd0d3d66',
        //     'isOpenMessageRoaming': true,
        //     'isProduction': false,
        //     'channel': '',
        // });
        //
        // JMessage.login({
        //     username: '18665711956',
        //     password: '18665711956',
        // }, (res) => {
        //     console.log('登录成功');
        //     console.log(res);
        // }, (err) => {
        //     console.log('登录失败');
        //     console.log(err);
        // });
    }, []);

    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
};

export default Demo;
