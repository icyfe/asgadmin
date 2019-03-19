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
function searchCashDrawList(params = {}) {
    return request({
        url: 'api/get/yj/search',
        method: 'get',
        params
    })
}
function idsearch(params = {}) {

    return request({
        url: 'api/get/yj/idsearch',
        method: 'get',
        params
    })
}
export { getCashDrawlList, upCashDrawlList, searchCashDrawList,idsearch }