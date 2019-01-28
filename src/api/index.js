import request from '@/util/request'
function getIndex(data) {

    return request({
        url: '/article/list',
        method: 'get',
        params: query
    })
}
export { getIndex }