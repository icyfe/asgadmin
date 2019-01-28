import request from '@/util/request'
function getCashDrawlList(params = {}) {

    return request({
        url: 'api/get/yj/txlist',
        method: 'get',
        params
    })
}

export { getCashDrawlList }