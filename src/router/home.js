//home路由接口 
const express = require('express');
const Router  = express.Router();
Router.get('/login',(req,res)=>{

	res.send('home ok')
})
module.exports =Router;