import request from '@/util/request'
function itemidnewsselect(data) {
    return request({
        url: 'api/post/pc/itemid_news-select',
        method:'post',
        data,
    })

}
function itemidnewsinsert(data) {
    return request({
        url: 'api/post/pc/itemid_news-insert',
        method: 'post',
        data,
    })

}

function itemidnewsdelete(data) {
    return request({
        url: 'api/post/pc/itemid_news-delete',
        method: 'post',
        data,
    })
}
export { itemidnewsselect, itemidnewsinsert, itemidnewsdelete }