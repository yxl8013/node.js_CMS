const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test01',{ useNewUrlParser: true }); //切记:url要加数据库名字

let  db = mongoose.connection;//实例化连接对象
//事件监听
db.on("error", function (error) {
    console.log("Database connection failure：" + error);
});

db.on("open", function () {
    console.log("数据库连接成功");
})

db.on('disconnected', function () {
    console.log('数据库连接断开');
})