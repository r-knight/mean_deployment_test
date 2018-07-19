const mongoose = require('mongoose');

module.exports = function(){
	var ProductSchema = new mongoose.Schema({
		title:{type: String, required: true, minlength: 4},
		price:{type: Number, required: true, min: 0},
		imageUrl: {type: String, required: false},
	}, {timestamps: true})

	mongoose.model('Product', ProductSchema);
	var Product = mongoose.model('Product');
}