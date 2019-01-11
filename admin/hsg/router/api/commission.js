const router = require('koa-router')();
const { Sql } = require('../../config/db');

const msql = new Sql();
router.get('/get/getCommission', async (ctx) => {
    let pid = ctx.query.pid || '1';
    
    console.log('佣金APIrun,Pid：', pid)
    let res = await msql.query(`CALL GetCommission(${pid},@today,@nmonth,@premonth)`);
    if (res) {
        res = res[0][0] || '';
        console.log('佣金', res);
        ctx.body = {
            status: 200,
            msg: '查询成功',
            res
        }
        return
    }
    ctx.body = {
        status: 100,
        msg: '查询失败',
    }
})
module.exports = router