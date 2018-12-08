//图片上传路由
const express =require('express');
const multer=require('multer')
const router=express.Router();
const fs=require('fs')
const path=require('path');
var upload = multer({dest:'uploads/'}) //dest:文件在服务器保存的临时路径

router.post('/img',upload.single('img'),(req,res)=>{
	console.log(req.file);
	fs.readFile(req.file.path, (err,data)=>{
		if(err){console.log(err);return res.send({
			err:1,
			msg:'上传失败',
			data:null
		})}
		//为了保证图片不被覆盖,采用时间戳加随机数生成文件名.
		let name = new Date().getTime()+parseInt(Math.random()*10000)+path.extname(req.file.originalname);
		fs.writeFile(path.join(__dirname,'../public/img',name), data,(err)=>{
			if(err){return console.log(err);}
			res.send({
				err:0,
				msg:'上传成功',
				data:'/img/'+name
			});
		});
	});
})
module.exports = router;