
const mongoose = require('mongoose'), Product = mongoose.model('Product');

function toFixed(num, fixed){
	//to normalize price inputs before calling create with the selected price
	
	const v = num.toString().split('.');
	if (fixed <= 0){
		return v[0];
	}
	let f = v[1] || '';
	if (f.length > fixed) {
		return `${v[0]}.${f.substr(0,fixed)}`;
	}
	while (f.length < fixed){
		f += '0';
	}
	return `${v[0]}.${f}`;
}
module.exports = {

	getProducts: function(req, res){
		Product.find({}, function(err, products){
			if(err){
				// respond with JSON
			   res.json({message: "Error", error: err})
			}
			else {
				// respond with JSON
			   res.json({message: "Success", data: products})
			}
		})
	},

	create: function(req, res){
		var title = req.body.title;
		var price = req.body.price;
		price = toFixed(price, 2);
		var imageUrl = req.body.imageUrl;
		Product.create({title: title, price: price, imageUrl: imageUrl}, function (create_err, new_product){
			if(create_err){
				// respond with JSON
			   res.json({message: "Error", error: create_err});
			}
			else{
				res.json({message: "Success", data: new_product});
			}
		})
	},

	update: function(req, res){
		Product.findOne({_id: req.body._id}, function(err, product){
			if(err){
			   console.log("Returned error in PUT 'products/:id' path", err);
				// respond with JSON
			   res.json({message: "Error", error: err})
			}
			else if (product == null){
				// respond with JSON
			   res.json({message: "Product with that id does not exist", data: product})
			}
			else{
				var title = null;
				var price = null;
				var imageUrl = null;	
				if (req.body.title){
					title = req.body.title;
				}
				if (req.body.price){
					price = req.body.price;
				}
				if (req.body.imageUrl){
					imageUrl = req.body.imageUrl;
				}
				if (title == null){
					title = product.title;
				}
				if (price == null){
					price = product.price;
				}
				if (imageUrl == null){
					imageUrl = product.imageUrl;
				}
				
				price = toFixed(price, 2);
				Product.update({_id: req.body._id}, {$set:{title: title, price: price, imageUrl: imageUrl}}, {runValidators: true}, function (create_err, updated_product){
					if(create_err){
					   console.log("Returned error on update", create_err);
						// respond with JSON
					   res.json({message: "Error", error: create_err})
					}
					else{
						res.json({message: "Success", data: updated_product})
					}
				})
			}
		 })
	},
	
	del: function(req, res){
		var id = req.params.id;
		Product.deleteOne({_id: id}, function(err, product){
			if(err){
			   console.log("Returned error in GET '/remove/:id' path", err);
				// respond with JSON
			   res.json({message: "Error", error: err})
			}
			else if (product.n == 1){
				// respond with JSON
			   res.json({message: "Product deleted", data: product})
			}
			else{
				res.json({message: "No product with that id exists"})
			}
		 })
	},

	get: function(req, res){
		var id = req.params.id;
		Product.findOne({_id: id}, function(err, product){
			if(err){
				// respond with JSON
			   res.json({message: "Error", error: err})
			}
			else if (product != null){
				// respond with JSON
			   res.json({message: "Success", data: product})
			}
			else{
				res.json({message: "No product with that id exists"})
			}
		 }).populate('reviews')
	}
}