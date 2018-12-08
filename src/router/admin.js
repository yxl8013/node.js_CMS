//admin 管理员路由

/**
 * @api {get} /admin/login  登陆
 * @apiName login
 * @apiGroup admin
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
//登陆接口
const express = require('express');
const Router  = express.Router();
const Admin = require('../mongo/model/admin_user.js');

const send_email = require('./send_mail.js');
Router.post('/login',(req,res)=>{
	let {uname,psw} =req.body;
	Admin.find({username:uname})
	.then((data)=>{
		if(data.length==0){
			return res.send({err:2,msg:'用户名不存在',data:null});
		}
		if(data[0].password ==psw){
			res.send({err:0,msg:'登陆成功',data:null})
		}else{
			res.send({err:1,msg:'密码不正确',data:null})
		}

	}).catch((err)=>{
		console.log(err);
		res.send({err:3,msg:'登陆失败',data:null});
	})
})
/**
 * @api {get} /admin/getUserInfo  获取用户信息
 * @apiName getUser
 * @apiGroup admin
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

Router.post('/getUserInfo',(req,res)=>{
	
})
//注册的接口
	//获取邮箱验证码的
let check ={}; //对象保存邮箱和生成的验证码信息
let d1;//验证码开始的时间
let time_300 = 300;//有效时间 300秒
Router.post('/getcode',(req,res)=>{
	let {email} = req.body;
	if(!email){return res.send({err:1,msg:'邮箱不能空',data:'false'})};
	let code = parseInt(Math.random()*1000000);
	check[email] =code;
	send_email.sendmail(email,code,(status)=>{
		// console.log(status);//status -1 失败
		if(status){  
			res.send('false');//发送失败
		}else{
			d1 = new Date();
			res.send({err:0,msg:'验证码已发送,300秒内有效',data:'true'});	
		}
	});
})
Router.post('/reg',(req,res)=>{
	var d2 = new Date();
	let time_dif = (d2.getTime()-d1.getTime())/1000;//秒
	time_dif = Math.ceil(time_dif);
	if(time_dif>time_300){check ={};return res.send('验证码已过有效期')};
	let {email,psw,code,uname} =req.body;
	//查询是否存在该用户名,不存在允许注册
	Admin.find({username:uname}).then((data)=>{
		if(data.length>0){
			return res.send({err:2,msg:'用户名已存在',data:'false'});
			//终止链式调用,不能return,需要主动抛出一个错误throw new Error('用户名已经存在');
		}

		if(code == check[email]){
			//数据库操作插入
			Admin.insertMany({email:email,username:uname,password:psw})
			.then((data)=>{
				// console.log(data);
				check ={};
				res.send({err:0,msg:'注册成功',data:'true'});
			}).catch((err)=>{
				console.log(err);
				res.send({err:1,msg:'注册失败',data:'false'});
			})
		}else{
			res.send({err:1,msg:'验证码不正确',data:'false'});
		}
		 
	})
})


module.exports =Router;

    
    
