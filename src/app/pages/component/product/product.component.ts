import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IData } from 'src/app/core/interfaces/IData';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public product:IData;
  public amount:number;
  public quantity:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('product').then((res)=>{
      this.product = res
    })
  }

  public quantityChange(quantityText): void {
    this.amount = quantityText * this.product.price;
  }

  public amountChange(amountText):void {
    this.quantity = amountText / this.product.price;
  }

  public addAmount(number): void {
    this.amount = number;
    this.amountChange(this.amount);
  }

  public addQuantity(number): void {
    this.quantity = number;
    this.quantityChange(this.quantity);
  }

}
