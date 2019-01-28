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
export { getOrderList, searchOrder }