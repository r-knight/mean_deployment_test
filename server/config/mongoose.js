const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const fs = require('fs');
var path = require('path');

module.exports = function(){

	var models_path = path.join(__dirname, './../models');
	mongoose.connect('mongodb://localhost/productmanager');
	fs.readdirSync(models_path).forEach(function(file){
		if (file.indexOf('.js') >= 0){
			require(models_path + '/' + file)();
		}
	})
}