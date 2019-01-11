const router = require('koa-router')();
const { Sql } = require('../../config/db');
const md5 = require('../../config/md5com');
const msql = new Sql();
router.post('/post/pc/login', async (ctx) => {
    let data = ctx.request.body
    console.log('传参', data);
    let result = await checkdata(data.data);
    console.log(result);
    ctx.session['user_id'] = data.data;
    console.log('loginsession', ctx.session['user_id']);
    ctx.body = result;
})
router.post('/post/mob/login', async (ctx) => {
    let data = ctx.request.body
    data = await checkdata(data);

    ctx.body = { data };
})

//检查用户数据
async function checkdata(data) {
    console.log('检查数据源',data);
    let pwd= data.password;//此处应进行MD5加密
        pwd = md5.md5(pwd + md5.MD5_SUFFIX);
        console.log("加密",pwd);
    let str = `select * from user where phone = '${data.user}'`;
    console.log('语句',str);
    let ret = await msql.query(str);
    ret = ret[0];
    console.log('查询用户的结果',ret);
    if (!ret) {
        return {
            status: 100,
            msg: '用户尚未注册'
        }
    } else if (pwd != ret.pwd) {
        return {
            status: 100,
            msg: '用户密码不正确'
        }
    } else {
        return {
            status: 200,
            msg: "SUCESSS",
            user:{
                name:ret.Username,
                phone:ret.Phone,
                yqcode:ret.InviteCode,
                pid:ret.PID,
                cc:'ccc'
            },
        }
    }
}
module.exports = router;