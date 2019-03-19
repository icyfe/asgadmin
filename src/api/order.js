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
// 运营商月总业绩
function getyysmonthorder(data) {
    return request({
        url: 'api/post/order/yysmonthorder',
        method: 'post',
        data
    })
}
//运营商历史总业绩
function getyysallorder(data) {
    return request({
        url: 'api/post/order/yysallorder',
        method: 'post',
        data
    })
}
export { getOrderList, searchOrder, searchmonthOrder, searchtotalOrder, getyysmonthorder, getyysallorder }