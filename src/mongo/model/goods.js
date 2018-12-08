const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let goodsSchema = new Schema({
	name:{type:String,required:true},
	type:{type:String,required:true},
	desc:{type:String,required:true},
	price:{type:String,required:true},
	imgpath:{type:String,required:true},
	stock:{type:Number,required:true},   // 库存
	upper:{type:Boolean,default:false}  //上架 默认false 
})
//把Schema对象转化为数据模型 model
let Goods = mongoose.model('goods',goodsSchema);
module.exports = Goods;