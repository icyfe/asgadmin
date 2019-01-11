const router = require('koa-router')();
const { Sql } = require('../../config/db');
const bodyparser = require('koa-bodyparser');
const https = require('https');
const Rndom = require('./util/util');


const msql = new Sql();
//商品列表
router.get('/get/listgoods', async (ctx) => {
    console.log('执行查询商品列表')
    let page = ctx.query.page * 20 || 0;
    let type = ctx.query.type || '';
    let screen = ctx.query.screen || 0; // screen:0精选默认， 1销量，2最新，3价格
    let jg = ctx.query.jg || ''; // jg ：0升序， 1降序
    let listgoods = '';
    if (ctx.query.type) {
        listgoods = await _query(`SELECT *FROM yhq_goods where type='${type}' limit ${page},20`);
    } else {
        listgoods = await _query(`SELECT *FROM yhq_goods limit ${page},20`);
    }

    let result = _filter(listgoods, screen, jg);//商品条件过滤 

    ctx.body = {
        success: 200,
        data: {
            result,
        }
    };
})

//商品详情
router.get('/get/detailgoods', async (ctx) => {
    console.log("商品详情开始查询");
    let id = ctx.query.id || '';
    let screen = ctx.query.screen;
    console.log('NUMID', id);
    if (!id) {
        return {
            status: 100,
            msg: '查无此商品'
        }
    }
    let goods = await msql.query(`SELECT *from yhq_goods where num_iid = ${id}`);
    goods = goods[0];
    let sm_banner = goods.small_images || '';
    sm_banner = JSON.parse(sm_banner);
    console.log('小图', sm_banner)
    let result = {
        detail: goods.detailStr,
        price: goods.zk_final_price,
        value: parseInt(goods.coupon_info.match(/减(\S*)元/)[1]),
        reprice: parseInt(goods.zk_final_price + this.value),
        readyby: Rndom.RndNum(5),
        title: goods.shop_title,
        shop: goods.nick,
        desc: goods.title,
        tkl: goods.taobaoModel,
        coupon_click_url: goods.coupon_click_url,
        startdate: goods.coupon_start_time || '未知',
        enddate: goods.coupon_end_time || '未知',
        sm_banner: !sm_banner ? ['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1543286998&di=dd5e71843a94d134a5df98f0d06681b3&src=http://attach.bbs.miui.com/forum/201704/10/110641wann1nfq117aa1bn.jpg'] : sm_banner.string,
    }
    ctx.body = {
        status: 200,
        msg: '获取商品详情成功',
        result,
    }

})
router.get('/get/test', async (ctx) => {
    let ret = await msql.query(`CALL GetCommission('1',@today,@nowmonth,@premonth)`)
    console.log('ret', ret);
    ctx.body = {
        msg: '信息如下',
        ret,
    }
})
async function _query(str) {
    let ret = await msql.query(str);
    // msql.endSql();
    return ret;
}

//商品条件过滤 // screen:0精选默认， 1销量，2最新，3价格 jg ：0降序， 1升序
function _filter(list, screen, jg) {
    let result = [];
    list.forEach(item => {
        result.push({
            img: item.pict_url,
            title: item.title,
            price: parseInt(item.zk_final_price),
            value: parseInt(item.coupon_info.match(/减(\S*)元/)[1]),
            reprice: parseInt(item.zk_final_price + this.value),
            readyby: parseInt(Rndom.RndNum(3)),
            itemid: item.num_iid,
            update: item.coupon_start_time,
            yj: (parseFloat(item.coupon_info.match(/减(\S*)元/)[1]) * parseFloat(item.commission_rate) / 100).toFixed(2)
        })
    })
    console.log(screen, jg);
    switch (screen) {
        case '0':
            return result
        case '1':
            return result.sort(compare('readyby'));

        case '2':
            return result.sort(compare('update'));

        case '3':
            return result.sort(compare('price', jg));
        default:
            return result;
    }

}
function compare(param, jg) {
    // console.log('执行到这了')
    if (param == 'price') {
        if (jg == 0) {
            return function (a, b) {
                return b[param] - a[param]
            }
        }
        if (jg == 1) {
            return function (a, b) {
                return a[param] - b[param]
            }
        }
    } else {
        return function (a, b) {
            if (param == 'update') {
                return new Date(b[param]) - new Date(a[param]);
            }
            return b[param] - a[param];
        }
    }
}
module.exports = router;

