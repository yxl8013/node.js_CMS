const express = require('express'); //框架
const app  = express(); //框架实例
const bodyParser = require('body-parser');//解析post请求的数据
app.use(bodyParser.urlencoded({ extended: false })); //x-www
app.use(bodyParser.json()); //json
const admin_router = require('./router/admin.js') //引入admin路由
const home_router = require('./router/home.js') //引入home路由
const upload_router =require('./router/upload.js');//图片上传路由
const goods_router  = require('./router/goods.js');//商品管理路由
let db = require('./mongo/connect_db.js'); //连接数据库
app.use(express.static('./public')) //开启一个静态资源目录
app.use(express.static('./admin')) //开启一个静态资源目录
//开启一个服务器
app.listen(3000,(err)=>{
	if(err){throw err};
	console.log('3000 port alread start');
})
//路由分发
app.use('/admin',admin_router);
// app.use('/home',home_router);
app.use('/upload',upload_router);
app.use('/goods',goods_router);
