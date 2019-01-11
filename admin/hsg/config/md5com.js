const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX : 'aishenggou!@#$%%!@#',// 为用户密码进行进一步的伪装
    md5:function (pwd) {
        const md5 = crypto.createHash('md5');  
        
        return md5.update(pwd).digest('hex');
    },
    
}