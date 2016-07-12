import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {Storage,LocalStorage,SqlStorage} from 'ionic-angular';
import {StoreDetails} from '../store-details/store-details';
import {DbContent} from '../../service/dbContent';

@Component({
  templateUrl: 'build/pages/store/store.html'
})
export class StorePage {
  color: string;
  storage;
  storeList=[];

  constructor(private _navController: NavController, private _navParams: NavParams,private dbContent:DbContent) {

   dbContent.n="naveen";

  	let options = {name :"mirrow"};
	  this.storage = new Storage(SqlStorage, options);
	  this.storage.query("SELECT * FROM store").then((data) => {
              
              console.log("ds",JSON.stringify(data.res.rows)); 
              

              this.storeList=[];

              if(data.res.rows.length > 0) {
                    for(var i = 0; i < data.res.rows.length; i++) {
                        this.storeList.push({store_id: data.res.rows.item(i).store_id, location: data.res.rows.item(i).location, storeName:data.res.rows.item(i).store_name});
                    }
                }              
           
             console.log("czxcz",this.storeList);
            },
         (error) => {
            console.log("ERROR" + JSON.stringify(error.err));
            });
    
  }

 
 	selectedStore(store){
      console.log("store is ", store)
      this._navController.push(StoreDetails);
 	}	



}
