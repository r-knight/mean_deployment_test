import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
	id: any;
	productToEdit: any;
	error: any;
	constructor(private _httpService: HttpService, private _route: ActivatedRoute,  private _router: Router) { 
	}

	ngOnInit() {
		let observable = this._route.params.subscribe(params =>{
			this.id = params['id'];
			let authObserable = this._httpService.getProduct(this.id);
			authObserable.subscribe( resObj => {
				if (resObj['error']){
					this.error = "No author with the ID '" + this.id + "' exists";
				}
				else{
					this.error = null;
					this.productToEdit = resObj['data'];
				}
			})
		})
	}
	onSubmitEditAuthor(){
		console.log(this.productToEdit);
		let observable = this._httpService.editProduct(this.productToEdit, this.id);
		observable.subscribe( data => {
			console.log(data);
			if(data["message"] && data["message"] != "Success"){
				this.error = data["message"];
			}
			else{
				this.error = null;
				this._router.navigate([`./products/list`]);
			}
		})	
	}
}
