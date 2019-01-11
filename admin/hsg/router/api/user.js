const router = require('koa-router')();
const { Sql } = require('../../config/db');

const msql = new Sql();

//运营商会员列表
router.post('/post/pc/user-select', async (ctx) => {
    let data = ctx.request.body;
    console.log("data",data)
    let results = await _query(`SELECT * FROM user where OperatorCode = '${data.OperatorCode}'`);

    ctx.body = {
        success: 200,

        results,

    };
})

async function _query(str) {
    let ret = await msql.query(str);
    // msql.endSql();
    return ret;
}
module.exports = router;