import {Dimensions} from 'react-native';

// 设计稿的宽度/元素的宽度 = 手机屏幕/手机中元素的宽度
// 手机中元素的宽度 = 手机屏幕 * 元素的宽度 / 设计稿的宽度

/**
 * 付民康  2021/3/11
 * desc: 获取手机屏幕的宽度
 * @params
 **/
export const screenWidth = Dimensions.get('window').width;

/**
 * 付民康  2021/3/11
 * desc: 获取手机屏幕的高度
 * @params
 **/
export const screenHeight = Dimensions.get('window').height;

// 默认设计稿宽度为375；
let designWidth = 375;

/**
 * 付民康  2021/3/11
 * desc: 将px转为dp
 * @params elePx:元素的宽度或者高度 单位px
 **/
export const pxToDp = (elePx) => screenWidth * elePx / designWidth;
