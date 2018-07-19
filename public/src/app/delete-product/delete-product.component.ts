import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
	id: any;
	productToDelete: any;
	error: any;
	constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { 
	}

	ngOnInit() {
		let observable = this._route.params.subscribe(params =>{
			this.id = params['id'];
			let authObserable = this._httpService.getProduct(this.id);
			authObserable.subscribe( resObj => {
				if (resObj['error']){
					this.error = "No product with the ID '" + this.id + "' exists";
				}
				else{
					this.error = null;
					this.productToDelete = resObj['data'];
					console.log(this.productToDelete);
				}
			})
		})
	}
	onSubmitDeleteProduct(){
		let observable = this._httpService.deleteProduct(this.id);
		observable.subscribe( data => {
			console.log("DATA:", data);
			if(data["message"] && data["message"] != "Product deleted"){
				this.error = data["message"];
			}
			else{
				this._router.navigate([`./products/list`]);
			}
		})	
	}

}
