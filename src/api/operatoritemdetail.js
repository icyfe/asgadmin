import request from '@/util/request'
function operatoritemdetail(data) {
    return request({
        url: 'api/post/pc/operatoritemdetail-select',
        method:'post',
        data,
    })

}
function operatoritemdetaildelete(data) {
    return request({
        url: 'api/post/pc/operatoritemdetail-delete',
        method: 'post',
        data,
    })

}

function operatoritemdetailinsert(data) {
    return request({
        url: 'api/post/pc/operatoritemdetail-insert',
        method: 'post',
        data,
    })
}
export { operatoritemdetail, operatoritemdetaildelete, operatoritemdetailinsert }