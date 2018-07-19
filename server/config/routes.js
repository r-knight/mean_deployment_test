const mongoose = require('mongoose');
var products = require ('./../controllers/products.ctrl.js');
var path = require('path');
module.exports = function(app){
	app.get('/api/products', products.getProducts);
	app.post('/api/products', products.create);
	app.put('/api/products/:id', products.update);
	app.delete('/api/remove/:id/', products.del);
	app.get('/api/products/:id', products.get);

	app.all("*", (req,res,next) => {
		res.sendFile(path.resolve("./public/dist/public/index.html"))
	});
}