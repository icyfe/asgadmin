const koa = require('koa2');
const views = require('koa-views');
const router = require('./router/index');
const static = require('koa-static');
const path = require('path');
const cors = require('koa-cors');
const session = require("koa-session-minimal");
const bodyParser = require('koa-bodyparser')
 
const app = new koa();
let cookie = {
    maxAge: 20*60*1000, // cookie有效时长
    expires: new Date('2018-11-15'),  // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
  
  }
app.use(session({
    key:"SESSION_ID",
    cookie,
}))
app.use(bodyParser());
app.use(cors({
        origin: function (ctx) {
            // 这里用 headers 和 header 属性皆可 
            return '*';
        }
    }))
// app.use()
app.use(static(path.join(__dirname, './static')));
app.use(views(__dirname + '/views', { extension: 'ejs' }));
app.use(router.routes()).use(router.allowedMethods());
app.listen(3302);
console.log('listen 3302 port')
