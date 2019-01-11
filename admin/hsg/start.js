let Service = require('node-windows').Service;

let svc = new Service({
    name: 'asg',    //服务名称
    description: '爱省购官网', //描述
    script: 'C:/project/hsg/index.js' //nodejs项目要启动的文件路径
});

svc.on('install', () => {
    console.log('服务启动')
    svc.start();
});

svc.install();
 