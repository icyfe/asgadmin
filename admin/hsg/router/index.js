const router = require('koa-router')();
const api = require('./api/api');
const home = require('./home')
 
// router.use(async (ctx) => {
//     if (ctx.url != '/login' && !ctx.session["user_id"]) {
//         ctx.body = {
//             status:100,
//         }
//     }
// })
router.use('/', home.routes(), api.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods())
module.exports = router;