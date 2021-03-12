/**
 * 付民康  2021/3/12
 * desc: 校验手机号码
 * @params phone: 输入的手机号码
 **/
export const validatePhone = (phone) => {
    const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    return reg.test(phone)
}