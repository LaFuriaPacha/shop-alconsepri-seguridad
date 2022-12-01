import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';


import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {

  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService){
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.get(id).pipe(take(1)).subscribe(p => {
      this.product = p;
      console.log(this.product)
    });
  }

  save(product){
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
