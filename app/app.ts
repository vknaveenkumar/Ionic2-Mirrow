import {Component} from '@angular/core';
import {DbContent} from './service/dbContent';
import {surveyContent} from './service/surveyContent';
import {Platform, ionicBootstrap,Storage,LocalStorage,SqlStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [DbContent,surveyContent]
})
export class MyApp {
  rootPage: any = HomePage;
  storage;

  constructor(platform: Platform, dbContent:DbContent,surveycontent :surveyContent) {



    platform.ready().then(() => {
     
 
    dbContent.databaseProperties();

		StatusBar.styleDefault();
	  });	

  }





}

ionicBootstrap(MyApp);
