const router = require('koa-router')();
const { Sql } = require('../../config/db');

const msql = new Sql();

//运营商商品列表
router.post('/post/pc/operatoritemdetail-select', async (ctx) => {
    let data = ctx.request.body;
    //console.log("data",data)
    let results = await _query(`SELECT * FROM operatoritemdetail where seller_id = '${data.OperatorCode}'`);

    ctx.body = {
        success: 200,

        results,

    };
})

//运营商商品新增
router.post('/post/pc/operatoritemdetail-insert', async (ctx) => {
    let data = ctx.request.body;
    console.log("data",data)
    let results = await _query(`insert operatoritemdetail(seller_id,shop_title,num_iid,title,zk_final_price,volume,sales_qty,pict_url,small_images) 
        values('${data.seller_id}','${data.shop_title}','${data.num_iid}','${data.gender}','${data.zk_final_price}','${data.volume}',0,'','')`);

    ctx.body = {
        success: 200,
        results,

    };
})

//运营商商品删除
router.post('/post/pc/operatoritemdetail-delete', async (ctx) => {
    let data = ctx.request.body;
    //console.log("data",data)
    let results = await _query(`delete FROM operatoritemdetail where num_iid = '${data.num_iid}'`);

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