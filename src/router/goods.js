//商品管理路由
const express = require('express');
const Router  = express.Router();
const Goods = require('../mongo/model/goods.js');//引入商品数据模型
//添加商品
Router.post('/add',(req,res)=>{
	let option = {name,type,desc,price,stock,imgpath}= req.body;
	Goods.insertMany(option)
	.then((data)=>{
		console.log(data);
		res.send({err:0,msg:'添加成功',data:null});
	}).catch((err)=>{
		console.log(err);
		res.send({err:1,msg:'添加失败',data:null});
	})
})
//查询商品
//根据id查询一个
Router.post('/getGoodsOne',(req,res)=>{
	let id = req.body.id;
	Goods.find({_id:id})
	.then((data)=>{
		res.send({err:0,msg:'查询成功',data:data});
	})
	.catch((err)=>{
		console.log(err);
		res.send({err:1,msg:'查询失败',data:null});
	})
})


//查询所有
Router.post('/getGoods',(req,res)=>{
	//find({type:'手机'})分类查询
	//find().limit().skip()分页查询
	let pagesize = 10;
	let pagenum = 1;
	let total = 0;
	if(req.body.pagenum){
		pagenum = req.body.pagenum*1;
	}
	if(req.body.pagesize){
		pagesize = req.body.pagesize*1;
	}
	Goods.find().then((data01)=>{
		total = data01.length;
		return Goods.find().limit(pagesize).skip((pagenum-1)*pagesize) ;
	})
	.then((data)=>{
		// console.log(data);
		res.send({err:0,msg:'查询成功',data:data,total:total});
	}).catch((err)=>{
		console.log(err);
		res.send({err:1,msg:'查询失败',data:null});
	})
})
//模糊查询 关键字
Router.post('/kwGoods',(req,res)=>{
	let kw = req.body.kw;
	Goods.find({$or:[{name:{$regex:kw}},{desc:{$regex:kw}}]})
	.then((data)=>{
		res.send({err:0,msg:'查询成功',data:data});
	})
	.catch((err)=>{
		console.log(err);
		res.send({err:1,msg:'查询失败',data:null});
	})
})





//修改商品
Router.post('/upDate',(req,res)=>{
	//根据_id
	let id = req.body.id;
	let obj ={name,type,desc,imgpath,stock,price}=req.body;
	Goods.update({_id:id},obj).then((data)=>{
		console.log(data);
		res.send({err:0,msg:'修改成功',data:null});
	}).catch((err)=>{
		console.log(err);
		res.send({err:1,msg:'修改失败',data:null});
	})
})
//删除商品
Router.post('/delete',(req,res)=>{
	let id = req.body.id;
	let delall = req.body.delall;//是否批量删除
	console.log(id);
	console.log(delall);
	if(delall){
		id=JSON.parse(id);
		Goods.remove({_id:{$in:id}})
		.then((data)=>{
			console.log(data);
			res.send({err:0,msg:'删除成功',data:null});
		})
		.catch((err)=>{
			console.log(err);
			res.send({err:1,msg:'删除失败',data:null});
		})
	}else{
		Goods.deleteMany({_id:id})
		.then((data)=>{
			console.log(data);
			res.send({err:0,msg:'删除成功',data:null});
		})
		.catch((err)=>{
			console.log(err);
			res.send({err:1,msg:'删除失败',data:null});
		})
	}	
})





module.exports =Router;