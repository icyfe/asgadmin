import request from '@/util/request'
//获取单条新闻栏目
function getnewitem(params = {}) {
    // console.log('获取新闻栏目',params)
    return request({
        url: 'api/get/news/newcolumn',
        method: 'get',
        params
    })
}
//获取全部新闻栏目
function getallnewitem(params = {}) {
    return request({
        url: 'api/get/news/allnewcolumn',
        method: 'get',
        params
    })
}
function insertnews(data = {}) {
    return request({
        url: 'api/post/news/insertnews',
        method: 'post',
        data
    })
}
function getnewslist(params = {}) {
    return request({
        url: 'api/get/news/newslist',
        method: 'get',
        params
    })
}
function insertnewscolumn(data = {}) {
    return request({
        url: 'api/post/news/insertnewscolumn',
        method: 'post',
        data
    })
}
function deletenews(data = {}) {
    return request({
        url: 'api/post/news/deletenews',
        method: 'post',
        data
    })
}

export {
    getnewitem, insertnews, getnewslist, insertnewscolumn, deletenews,getallnewitem
}