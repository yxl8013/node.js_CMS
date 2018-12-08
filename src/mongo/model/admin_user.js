const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let adminSchema = new Schema({
	email:{type:String,required:true},
	username:{type:String,required:true},
	password: {type:String,required:true}
})
//将Schema对象转化为数据模型 model
let Admin = mongoose.model('admin',adminSchema);
module.exports = Admin;