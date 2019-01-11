const router = require('koa-router')();
const koabody = require('koa-body');
const path = require('path');
const fs = require('fs');
router.post('/post/upload', koabody({ jsonLimit: '2mb', multipart: true }), async (ctx) => {
    const data = ctx.request.files;
    console.log(data);
    let fspath = path.join(__dirname, '../../static/uploads/avatar');
    const savePath = path.join(`${fspath}`, data.file.name)
    const reader = fs.createReadStream(data.file.path)
    const writer = fs.createWriteStream(savePath)

    const pro = new Promise((resolve, reject) => {
        var stream = reader.pipe(writer);
        stream.on('finish', function () {
            resolve(`http://localhost:3302/uploads/avatar/${data.file.name}`);
        });
    })
    // ctx.body = {
    //     code: 1
    // }
    ctx.body = await pro
})
module.exports = router




