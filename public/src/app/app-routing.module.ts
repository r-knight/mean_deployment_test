import { AppComponent } from './app.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'products', children:[
	  { path: 'list',component: ProductListComponent },
	  { path: 'new',component: NewProductComponent },
	  { path: 'edit/:id', component: EditProductComponent },
	  { path: 'delete/:id', component: DeleteProductComponent }
	]
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
