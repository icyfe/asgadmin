/**
 * 用户注册接口
 * 
 *  */
const router = require('koa-router')();
const { Sql } = require('../../config/db');
const md5 = require('../../config/md5com');
const Rndom = require('./util/util')
const msql = new Sql();

router.post('/post/mob/register', async (ctx) => {
    let data = ctx.request.body
    data = await checkdata(data);

    ctx.body = { data };
})

//检查用户数据
async function checkdata(data) {
    console.log(data);
    let pwd = data.password;
    pwd = md5.md5(pwd + md5.MD5_SUFFIX);
    console.log("加密后的密码值", pwd);
    
    let user = await msql.query(`select *from user where phone = ${data.user}`);
    user = user[0]; //查询用户是否已经存在
    // console.log(user);
    if (user) {
        return {
            status: 100,
            msg: '用户已存在请直接登入'
        }
    } else {
        console.log('邀请码是1',data.yqm);
        let checkyqm = await msql.query(`SELECT *from user where InviteCode = '${data.yqm}'`);//检查邀请码是否有效
        checkyqm = checkyqm[0];
        console.log('yqmIs: ',checkyqm);
        if (!checkyqm) {
            return {
                status: 100,
                msg: '邀请码无效',
            }
        }
        let newyqm = Rndom.RndNum(8);
        user = await msql.query(`INSERT user (Username,Phone,pwd,InviteCode,type) value ('${data.user}','${data.user}','${pwd}','${newyqm}','3')`)
        if (user.serverStatus == 2) {
            return {
                status: 200,
                msg: '注册成功！',
                user: {
                    name: data.user,
                    phone: data.user,
                    yqcode: newyqm
                },
            }
        }
    }
}
module.exports = router;