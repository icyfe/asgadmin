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

function getmemberList(data) {
    return request({
        url: `api/post/pc/memberlist`,
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
export { userSelect, getmemberList, upuserpsw, getusermessage, userupgradelevel,userSelect1 }