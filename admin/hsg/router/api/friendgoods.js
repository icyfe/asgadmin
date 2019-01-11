const router = require('koa-router')();
const { Sql } = require('../../config/db');
const bodyparser = require('koa-bodyparser');
router.use(bodyparser())
const msql = new Sql();

router.get('/get/friendgoods', async (ctx) => {
    console.log('朋友圈执行查询商品列表')
    let page = ctx.query.page * 20 || 0;
    let listgoods = '';
    listgoods = await msql.query(`SELECT *FROM yhq_goods  limit ${page},20`);

    let listCircle = [];
    listgoods.forEach(item => {
        let small_images = item.small_images;
        small_images = JSON.parse(small_images);
        listCircle.push({
            head:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1542959586&di=839839ceab3ff17c61cce85b48220b5f&src=http://img0.pconline.com.cn/pconline/1807/26/11521445_1.jpeg',
            name: '爱省君',
            title: item.title,
            imgList: !small_images?'':small_images.string,
            tkl: item.taobaoModel
        })
    })

    ctx.body = {
        success: 200,
        listCircle,
    };
})

module.exports = router;