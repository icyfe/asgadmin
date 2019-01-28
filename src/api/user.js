import request from '@/util/request'
function userSelect(data) {
    return request({
        url: `api/post/pc/user-select`,
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
export { userSelect, getmemberList, upuserpsw }