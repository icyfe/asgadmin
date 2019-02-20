import request from '@/util/request'
function getCashDrawlList(params = {}) {

    return request({
        url: 'api/get/yj/txlist',
        method: 'get',
        params
    })
}
function upCashDrawlList(data = {}) {
    return request({
        url: 'api/post/yj/upstatus',
        method: 'post',
        data
    })
}
export { getCashDrawlList, upCashDrawlList }