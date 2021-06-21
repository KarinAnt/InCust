import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IData } from 'src/app/core/interfaces/IData';
import * as data from '../../../assets/data/data.json';
import {Storage} from '@ionic/storage-angular';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  private _storage: Storage | null = null;

  public datas:IData[] = data['default'];
  public searchText ='';

  constructor(
    private router: Router,
    private storage: Storage,
  ) {
    this.init();
  }

  ngOnInit() {
    this.storage.get('searchText').then((res)=>{
      this.searchText = res;
    })
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public search(event): void {
    const text = event.target.value;
    this._storage?.set('searchText', text)
    this.datas = text ? data['default'].filter(val=>val.name.toLowerCase().includes(text.toLowerCase())) : data['default'];
  }

  public goToProduct(product:IData): void {
    this._storage?.set('product', product).then(()=>{
      this.router.navigate(['product'])
    })
  }

}
