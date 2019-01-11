const router = require('koa-router')();
const { Sql } = require('../config/db');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const path = require("path"); 
const msql = new Sql();
const Rndom = require('./api/util/util');
router.use(bodyparser());


router.get('', async (ctx) => {
    let title = '爱省购官网';
    let type = ctx.query.type || '男装';
    let start = ctx.query.page * 30 || 0; //分页一次请求多少条数据
     
    // console.log(start,'当前页');
    // console.log(ctx.query.type);
    let yhqdata = await _query(`SELECT COUNT(*) FROM yhq_goods where type='${type}';SELECT *FROM yhq_goods where type='${type}' limit ${start},30`);
    if (yhqdata) {
        let pages = yhqdata[0][0]["COUNT(*)"] / 30;
        if (pages.toString().indexOf('.') != -1) {
            pages = parseInt(pages) + 1;
        }
        let yhqlist = yhqdata[1];
        yhqlist.forEach((item, index) => {
            item.coupon_info = item.coupon_info.match(/减(\S*)元/)[1];
            item.volume =  Rndom.RndNum(5);
        })
        let navdata = await _query("select distinct type  from yhq_goods");
        // console.log(navdata);
        // console.log(pages + '页');
        await ctx.render('index', { navdata, title, yhqlist, type, pages, start });
    }
})
router.get('mobindex', async (ctx) => {
    let html = await render(path.join( './static/mobindex.html'))
    // console.log(html);
    ctx.set('Content-Type', 'text/html')
    ctx.body = html
});
router.get('admin', async (ctx) => {
    let html = await render(path.join( './static/adminindex.html'))
    // console.log(html);
    ctx.set('Content-Type', 'text/html')
    ctx.body = html
});

//  读取页面文件
function render(view) {
    return new Promise((res, rej) => {
        fs.readFile(`${view}`, 'utf-8', (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
}
async function _query(str) {
    let ret = await msql.query(str);
    ret = JSON.stringify(ret);
    ret = JSON.parse(ret);
    // msql.endSql();
    return ret;
}
module.exports = router;