const router = require('koa-router')();
const { Sql } = require('../../config/db');

const msql = new Sql();

//运营商列表
router.post('/post/pc/operatordetail-select', async (ctx) => {
    console.log('执行查询运营商列表')
    //let page = ctx.query.page * 20 || 0;
    let results = await _query(`SELECT * FROM Operator`);

    ctx.body = {
        success: 200,

        results,

    };
})

//新增运营商
router.post('/post/pc/OperatorDetail-insert', async (ctx) => {
    let data = ctx.request.body;
    let Operator = await msql.query(`INSERT Operator (OperatorPID,OperatorName,OperatorCode) value ('${data.OperatorPID}','${data.OperatorName}','${data.OperatorCode}')`)

    ctx.body = { status: 200, msg: '新增成功！' };
})

//修改运营商
router.post('/post/pc/operatordetail-update', async (ctx) => {
    let data = ctx.request.body;
    //console.log("data",data.OperatorName)
    let results = await msql.query(`select  * from Operator where  OperatorPID = '${data.OperatorPID}'`)
    if (results.length > 0) {
        let Operator = await msql.query(`update Operator set OperatorName ='${data.OperatorName}',OperatorCode = '${data.OperatorCode}' where OperatorPID = '${data.OperatorPID}'`)

        ctx.body = { code: 200, msg: '修改成功！' };
    } else {

        let Operator = await msql.query(`INSERT Operator (OperatorPID,OperatorName,OperatorCode) value ('${data.OperatorPID}','${data.OperatorName}','${data.OperatorCode}')`)
        let pidtable = await msql.query(`update pidtable set status =1 where pid = '${data.OperatorPID}'`)
        ctx.body = { status: 200, msg: '新增成功！' };
    }

})

//删除运营商
router.post('/post/pc/OperatorDetail-delete', async (ctx) => {
    let data = ctx.request.body;
    //console.log(`delete Operator from where OperatorPID = '${data.OperatorPID}'`)
    let Operator = await msql.query(`delete from Operator  where OperatorPID = '${data.OperatorPID}'`)

    ctx.body = { status: 200, msg: '删除成功！' };
})

//获取PID
router.post('/post/pc/pidtable', async (ctx) => {
    let data = ctx.request.body;
    //console.log(`delete Operator from where OperatorPID = '${data.OperatorPID}'`)
    let results = await msql.query(`select  * from pidtable where status=0 LIMIT 0 , 1`)

    ctx.body = { status: 200, results };
})

async function _query(str) {
    let ret = await msql.query(str);
    // msql.endSql();
    return ret;
}

module.exports = router;
