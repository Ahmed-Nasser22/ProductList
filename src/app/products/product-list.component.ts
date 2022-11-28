import { Component, OnInit , OnDestroy} from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./IProduct";
import { ProductService } from "./product.service";

@Component({
    templateUrl : './product-list.component.html',
    styleUrls :['./product-list.component.css']
})


export class ProductListComponent implements OnInit , OnDestroy {

  constructor(private productService :ProductService) {}
    pageTitle : string = 'Product List';
    imageWidth : number = 50;
    imageMargin : number = 2;
    showImage = false;
    private _listFilter = '';
    errorMessage ='';
    sub! :Subscription;


    get listFilter() { return this._listFilter; }
    set listFilter(value:string) 
    { 
      this._listFilter = value ;
      console.log(value) ;
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts :IProduct[] = [];
    products : IProduct[] = [];

      ToggleImage () : void {
        this.showImage = !this.showImage;
      }

      ngOnInit() :void{
        this.sub = this.productService.getProducts().subscribe({

          next : products =>{ this.products = products , 
            this.filteredProducts = this.products;  
          },
          error : err => this.errorMessage = err
        });
      }

      ngOnDestroy(): void {

       this.sub.unsubscribe();
      }

      performFilter(filterBy : string) : IProduct[]
       {
          return this.products.filter((product:IProduct) => product.productName
          .toLocaleLowerCase()
          .includes(filterBy.toLocaleLowerCase()))
       }
       OnRatingClicked(message : string) : void {
        this.pageTitle = message; 
       }
}
