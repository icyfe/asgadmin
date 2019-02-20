import request from '@/util/request'
//订单列表
function voucherhistorySelect(data) {

    return request({
        url: '/api/post/pc/voucherhistory-select',
        method: 'post',
        data
    })
}
// 订单查询
function voucherhistoryUpdateorinsert(data) {
    return request({
        url: '/api/post/pc/voucherhistory-updateorinsert',
        method: 'post',
        data
    })
}

export { voucherhistorySelect, voucherhistoryUpdateorinsert}