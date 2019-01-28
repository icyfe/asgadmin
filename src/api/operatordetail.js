import request from '@/util/request'
function operatordetailSelect(data) {
    return request({
        url: 'api/post/pc/operatordetail-select',
        method: 'post',
        data,
    })
}

function operatordetailUpdate(data) {
    return request({
        url: 'api/post/pc/operatordetail-update',
        method: 'post',
        data,
    })

}

function operatordetailDelete(data) {
    return request({
        url: 'api/post/pc/operatordetail-delete',
        method: 'post',
        data,
    })
}

function pidtable(data) {
    return request({
        url: 'api/post/pc/pidtable',
        method: 'post',
        data,
    })
}
export { operatordetailSelect, operatordetailUpdate, operatordetailDelete, pidtable }