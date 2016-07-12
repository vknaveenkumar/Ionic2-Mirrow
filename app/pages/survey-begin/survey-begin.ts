import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {Storage,LocalStorage,SqlStorage} from 'ionic-angular';
import {DbContent} from '../../service/dbContent';
import {surveyContent} from '../../service/surveyContent'
import {SurveyQuestionBegin} from '../survey-question-begin/survey-question-begin';


@Component({
  templateUrl: 'build/pages/survey-begin/survey-begin.html'
})
export class SurveyBeginPage {
  
  storage;
  surveyTitleList=[]
  Questions=[];
  constructor(private _navController: NavController, private _navParams: NavParams,private dbContent:DbContent,public surveycontent:surveyContent) {


 
     let options = {name :"mirrow"};
	  this.storage = new Storage(SqlStorage, options);
	  this.storage.query("SELECT * FROM survey").then((data) => {
              
              console.log("ds",JSON.stringify(data.res.rows)); 
              

              this.surveyTitleList=[];

              if(data.res.rows.length > 0) {
                    for(var i = 0; i < data.res.rows.length; i++) {
                        this.surveyTitleList.push({Id: data.res.rows.item(i).Id,Survey_name: data.res.rows.item(i).Survey_name});
                    }
                }              
           
             console.log("czxcz",this.surveyTitleList);
            },
         (error) => {
            console.log("ERROR" + JSON.stringify(error.err));
            });


}


selectedSurveyName(survey){

  this.surveycontent.surveyId=survey.Id;
  this.surveycontent.isEnd=false;
  this.surveycontent.NextquestionId=0;
  this.surveycontent.question={};

  //console.log("survey id",this.surveycontent.surveyId);
  this.getQuestionForSurvey();

 }


 getQuestionForSurvey(){

    let options = {name :"mirrow"};
    this.storage = new Storage(SqlStorage, options);
    var query="SELECT Id,The_question,survey_id FROM QUESTION WHERE survey_id="+this.surveycontent.surveyId;
    console.log("query is",query);

      this.storage.query(query).then((data) => {

            //console.log("data is",data.res.rows);
         
            //var list;

            if(data.res.rows.length > 0) {
                    for(var i = 0; i < data.res.rows.length; i++) {
                        //this.storeList.push({store_id: data.res.rows.item(i).store_id, location: data.res.rows.item(i).location, storeName:data.res.rows.item(i).store_name});
                        this.Questions.push(data.res.rows.item(i));
                        /*console.log("data",this.Questions);
                        console.log("JSON",JSON.stringify(this.Questions));*/
                        this.surveycontent.questions[i]=this.Questions[i];

                    }

                    //this.surveycontent.questions.push(this.Questions)
                     console.log("in service questions",this.surveycontent.questions)
                     this._navController.push(SurveyQuestionBegin)
                }  
            
            else{
              alert("NO QUESTIONS FOUND")
              
            }

            },
         (error) => {
            
            });


 } 

 
}
