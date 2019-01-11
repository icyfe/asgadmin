const { Http } = require('../util/http');
const http = new Http();
function userSelect(data) {
    return http.post(`api/post/pc/user-select`, data);
}
export {userSelect}