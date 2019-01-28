import request from '@/util/request'
 
function postLogin(data) {
    return request({
        url:'api/post/user/pc/login',
        method:'post',
        data
    })
}
export { postLogin }