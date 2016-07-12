import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {SurveyBeginPage} from '../survey-begin/survey-begin';

@Component({
  templateUrl: 'build/pages/store-details/store-details.html'
})
export class StoreDetails {
  color: string;

  constructor(private _navController: NavController, private _navParams: NavParams) {
    
  }


  StartSurvey(){
  	console.log("inside suruveys")
  	this._navController.push(SurveyBeginPage);
  }
}
