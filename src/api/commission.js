import request from '@/util/request'
function getCommission(params = {}) {

    return request({
        url: 'api/get/yj/getyj',
        method: 'get',
        params
    })
}
function upCommission(data) {
    return request({
        url: 'api/post/yj/upcommission',
        method: 'post',
        data
    })
}
export { getCommission, upCommission }