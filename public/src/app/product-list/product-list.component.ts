import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any;
  constructor(private _http: HttpService) {
		let observable = _http.getProducts();
		observable.subscribe(data => {
			if (data["data"]){
				this.products = data["data"];
			}
		})
	}

  ngOnInit() {
  }
}
