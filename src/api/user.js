import request from '@/util/request'
function userSelect(data) {
    return request({
        url: `api/post/pc/user-select`,
        method: 'post',
        data,
    });
}

function userSelect1(data) {
    return request({
        url: `api/post/pc/user-select1`,
        method: 'post',
        data,
    });
}
//获取当前运营商下的用户
function getmemberList(data={}) {
    return request({
        url: `api/post/pc/memberlist`,
        method: 'post',
        data
    })
}
//获取所有合伙人的用户
function getmemberAllList(data={}) {
    return request({
        url: `api/post/pc/memberlistall`,
        method: 'post',
        data
    })
}
function upuserpsw(data) {
    return request({
        url: `api/post/user/uppsw`,
        method: 'post',
        data
    })
}
//获取代理详细信息
function getusermessage(data) {
    return request({
        url: `api/post/pc/usermessage`,
        method: 'post',
        data
    })
}
//提升用户等级
function userupgradelevel(data) {
    return request({
        url: `api/post/pc/upgradelevel`,
        method: 'post',
        data
    })
}
//更新修改用户信息
function upuser(data) {
    return request({
        url: `api/post/user/upuser`,
        method: 'post',
        data
    })
}
//获取上级
function getparent(data) {
    return request({
        url: `api/post/user/getparent`,
        method: 'post',
        data
    })
}
//获取下级
function getchildren(data) {
    return request({
        url: `api/post/user/getchildren`,
        method: 'post',
        data
    })
}
export { userSelect, getmemberList, upuserpsw, getusermessage, userupgradelevel, userSelect1, upuser, getparent, getchildren,getmemberAllList }