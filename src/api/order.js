import request from '@/util/request'
//订单列表
function getOrderList(data) {

    return request({
        url: 'api/post/orderlist',
        method: 'post',
        data
    })
}
// 订单查询
function searchOrder(data) {
    return request({
        url: 'api/post/order/search',
        method: 'post',
        data
    })
}
// 订单月查询
function searchmonthOrder(data) {
    return request({
        url: 'api/post/order/searchmonth',
        method: 'post',
        data
    })
}
// 订单历史查询
function searchtotalOrder(data) {
    return request({
        url: 'api/post/order/searchtotal',
        method: 'post',
        data
    })
}

export { getOrderList, searchOrder,searchmonthOrder ,searchtotalOrder}