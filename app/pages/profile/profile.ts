import {Component} from "@angular/core";
import {NavController, NavParams,Page} from 'ionic-angular';
import {ROUTER_DIRECTIVES,Routes,ROUTER_PROVIDERS} from '@angular/router';
import {RoutePage} from '../route/route';


@Page({
  templateUrl: 'build/pages/profile/profile.html',
  directives: [ROUTER_DIRECTIVES]
})



export class DetailPage {
  color: string;

  constructor(private _navController: NavController) {
  }

  
  start(){
  	console.log("Going to next page");
   
    this._navController.push(RoutePage);
  }

}
