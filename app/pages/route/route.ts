import {Component,NgZone} from "@angular/core";
import {NavController, NavParams,Page} from 'ionic-angular';
import {DbContent} from '../../service/dbContent';
import {Storage,LocalStorage,SqlStorage} from 'ionic-angular';
import {StorePage} from '../store/store';


@Page({
  templateUrl: 'build/pages/route/route.html',
  providers:[DbContent]
})


export class RoutePage {
  color: string;
  storage ;
  routeList=[];
  make;  

  constructor(private _navController: NavController, private _navParams: NavParams,private dbcontent:DbContent) {

  	let options = {name :"mirrow"};
	  this.storage = new Storage(SqlStorage, options);
	  this.storage.query("SELECT * FROM route").then((data) => {
              
              console.log("ds",JSON.stringify(data.res.rows)); 
              

              this.routeList=[];

              if(data.res.rows.length > 0) {
                    for(var i = 0; i < data.res.rows.length; i++) {
                        this.routeList.push({id: data.res.rows.item(i).Id, location: data.res.rows.item(i).location, routeName:data.res.rows.item(i).route_name});
                    }
                }              
           
             console.log("czxcz",this.routeList);
            },
         (error) => {
            console.log("ERROR" + JSON.stringify(error.err));
            });


  }


  selectedRoute(route){
  	console.log("this is selected route",route)
    this._navController.push(StorePage)
  }




}
