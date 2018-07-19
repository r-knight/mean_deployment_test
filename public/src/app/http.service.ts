import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
	return this._http.get('/api/products');
 }

  getProduct(id){
	return this._http.get('/api/products/'+id);
 }
  deleteProduct(id){
		let urlString = '/api/remove/' + id;
		console.log(urlString);
		return this._http.delete(urlString);
 }

  editProduct(product, id){
		return this._http.put('/api/products/'+id, product);
	}

  submitProduct(product){
	return this._http.post('/api/products', product);
 }
}
