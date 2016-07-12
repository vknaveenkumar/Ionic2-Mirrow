import {Injectable}   from '@angular/core';

import {Storage,LocalStorage,SqlStorage} from 'ionic-angular';

@Injectable()
export class surveyContent{

  surveyId ;
  isEnd :boolean = false;
  NextquestionId :number ;
  question={};
  questions=[];
  QuestionOptions = {};



}