import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

	newProduct: any;
	constructor(private _httpService: HttpService, private _router: Router) { 
		this.newProduct = {name:"", price: -1, imageUrl:""};
	}

	ngOnInit() {
	}

	onSubmitCreateProduct(){
		console.log(this.newProduct);
		let observable = this._httpService.submitProduct(this.newProduct);
		observable.subscribe( data => {
			console.log(data);
			if(data["message"] == "Success"){
				this._router.navigate([`./list`]);
			}
		})	
	}
}
