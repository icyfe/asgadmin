const router = require('koa-router')();
const goods = require('./goods');
const login = require('./login');
const register = require('./register')
const friendgoods = require('./friendgoods');
const getcommission = require('./commission');
const operatordetail = require('./operatordetail');
const user = require('./user');
const operatoritemdetail = require('./operatoritemdetail');
// router.use(async(ctx) =>{
//     if(ctx.url =='/admin' && !ctx.session['user_id']){
//         return ctx.body = {
//             sucess:'100',
//             msg:'NO_LOGIN'
//         }
//     }
// })
router.use(getcommission.routes(),register.allowedMethods());
router.use(friendgoods.routes(),register.allowedMethods());
router.use(register.routes(), register.allowedMethods());
router.use(goods.routes(), goods.allowedMethods());
router.use(login.routes(), login.allowedMethods());
router.use(operatordetail.routes(), operatordetail.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(operatoritemdetail.routes(), operatoritemdetail.allowedMethods());
module.exports = router