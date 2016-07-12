import {Component,OnInit} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {surveyContent} from '../../service/surveyContent';
import {Observable}     from 'rxjs/Observable';
import {Storage,LocalStorage,SqlStorage,RadioGroup,RadioButton,Alert} from 'ionic-angular';
import {Camera,Transfer} from 'ionic-native';
import  {DetailPage} from '../profile/profile';

@Component({
  templateUrl: 'build/pages/survey-question-begin/survey-question-begin.html'
})

export class SurveyQuestionBegin implements OnInit{

  public base64Image: string;
  

  storage;

  question={};
  options;


  questionare ={
      answer:"",
      radioanswer:""
  };

   cameraUrl= '';
 
 /*Option type*/
  plain :boolean;
  isoption :boolean;
	yes_no :boolean;
	imageoption :boolean;
  camera:boolean;

 /*DONT Remove*/
  f_options=[];
  

   
   
  constructor(private _navController: NavController, private _navParams: NavParams,private surveycontent:surveyContent) {

  	console.log("In constructor");
    let options = {name :"mirrow"};
    this.storage = new Storage(SqlStorage, options);
    
  }


  
  ngOnInit(){

  	console.log("In init function" );
  	if(this.surveycontent.isEnd==true){

  		this.surveycontent.isEnd=false;
  		this.surveycontent.NextquestionId=0;
  		this.surveycontent.question={};
  	}
  /*---------------*/
   this.firstQuestionWithOptions().subscribe(

     (data)=>{
           // console.log("data are",JSON.stringify(data));
            //console.log("OPTION LENGTH are",this.options.length);
            if(this.options.length>0){
               
               if(this.options[0].answer_type=='PLAIN_TEXT'){
                this.plain = true;  
                }else if(this.options[0].answer_type=='OPTION_LABEL'){
                this.isoption = true;
                }else if(this.options[0].answer_type=='YES_NO_CANCEL'){
                this.yes_no = true;
                }else if(this.options[0].answer_type=='IMAGE_OPTIONS'){
                this.imageoption = true;
                }else if(this.options[0].answer_type=='CAMERA'){
                this.camera = true;
                }else{
                this.plain = false;
                this.isoption = false;
                this.yes_no = false;
                this.imageoption = false;
                this.camera = false;
              }

             console.log("=========================================================================")
            this.getNextQuestion(this.surveycontent.surveyId,this.surveycontent.NextquestionId)/*.subscribe((data)=>{console.log("ssssss",data)});*/
            console.log("next question id",this.surveycontent.NextquestionId)
           
            }

        },
      (err)=>{console.log("error",err)},
      ()=>{console.log("completed")}
     );
   

  
  }

  
  firstQuestionWithOptions():Observable<any>{

      console.log("FIRST QUESTION WITH OPTIONS");

      return Observable.create(observer => {

             this.plain = false;
             this.isoption = false;
             this.yes_no = false;
             this.imageoption = false;
             this.camera=false;

             var question_id=this.surveycontent.NextquestionId;
             console.log("question",question_id)
             console.log("survy id",this.surveycontent.surveyId);

    
             var promise= this.getNextQuestion(this.surveycontent.surveyId,this.surveycontent.NextquestionId)
  


                       promise.subscribe((data)=>{

                         setTimeout(() => {
                                this.question=this.surveycontent.question;
                                console.log("QUESTIONS FOR VIEW BIND",JSON.stringify(this.question));
                                this.options=this.surveycontent.QuestionOptions;
                                console.log("OPTIONS FOR VIEW BIND",JSON.stringify(this.options));
                                observer.next(this.options)
                          }, 500);
                            
    
                       },
                       (err)=>{console.log("in error stage",err)},
                       ()=>{console.log("data")}
                       )


      });
    
  }


  takePicture(){

    console.log("In take picture function");
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((data)=>{

      this.base64Image = "data:image/jpeg;base64," + data;
      /*console.log("image is",data);
       let ft = new Transfer();
       let filename =  1+ ".jpg";
       let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type' : undefined
            },
            params: {
                fileName: filename
            }
        }; 

        var uri="http://localhost:8080/Mirrow/"+"Servey_result_Default_Activity/uploadFile"

         ft.upload(data,encodeURI(uri), options, false)
        .then((r: any) => {
            console.log("in success part")

             var res = r.response.split("\":");        
            res = res[1].split("\"}");
            res = res[0].split("\\")
            res = res[0]+"\"";
            console.log("Response now   = " + res);
        }).catch((err: any) => {

           console.log("In error part");
            
        });         
 */

      //var ft = new FileTransfer();

    },(err) => {
        console.log(err);
    });


  }

  NextQuestion()
  {

    //console.log("-------------$scope.options=="+JSON.stringify(this.options));
    
    console.log("CLICKING NEXT QUESTION");
    console.log("next question id",this.surveycontent.NextquestionId);
     if(this.options!=undefined&&this.options.length>0){
           
           var answer = "";
           var selectedoption=null;
           var type= this.options[0].answer_type;
          

          if(type=='PLAIN_TEXT'){
              answer = this.questionare.answer;          
              this.questionare.answer="";
              console.log("Answer is",answer);
          }else if(type=='OPTION_LABEL'){
              selectedoption = this.questionare.radioanswer;
              answer ="";
          }else if(type=='YES_NO_CANCEL'){
              selectedoption = this.questionare.radioanswer;
              answer="";
          }else if(type=='IMAGE_OPTIONS'){
              selectedoption = this.questionare.radioanswer;
              answer ="";
          }else if(this.options[0].answer_type=='CAMERA'){
          //$scope.camera = true;
              answer = this.cameraUrl;
          }else{
            alert('nothing selected');
          }


          var userid=1;
          var survey_id=this.surveycontent.surveyId;
         // var quest_id=this.question.Id;
          var insert_question_query ="";
          var result = "";
          var id=0;

          var selectmaxq = "SELECT  *  from survey_results  where  Id = (select max(Id) FROM survey_results) ";

           this.storage.query(selectmaxq).then((data) => {
                   
                  console.log("*****************",data.res.rows.length);

                 if(data.res.rows.length>0){
                   console.log(data.res.rows.length);
                   console.log(" data found");
                   id=data.res.rows.item(0).Id;
                 }

              
                 

                 //insert_question_query="INSERT INTO survey_results VALUES(?,?,?,?,?,?,?,?,?)";
                   insert_question_query="INSERT INTO survey_results VALUES("+(id+1)+","+this.surveycontent.NextquestionId+","+selectedoption+","+1+","+1+","+1+","+survey_id+","+userid+",'"+answer+"')";
                   console.log("QUERY FOR SURVEY RESULTS",insert_question_query);


                       this.storage.query(insert_question_query).then((data) => {
                                console.log("inserted",data);
                                this.plain = false;
                                this.isoption = false;
                                this.yes_no = false;
                                this.imageoption = false;
                                this.camera = false;
                                this.options=[];
                              //  var nq_id=this.surveycontent.NextquestionId+1;
                                this.getNextQuestion(this.surveycontent.surveyId,this.surveycontent.NextquestionId).subscribe(

                                    (data)=>{
                                             
                                           this.question=this.surveycontent.question;
                                          console.log("question are",this.question);
                                          this.options=this.surveycontent.QuestionOptions;
                                          console.log("option are",this.options)

                                          if(this.options.length>0){
                                          if(this.options[0].answer_type=='PLAIN_TEXT'){
                                                  this.plain = true;  
                                                }else if(this.options[0].answer_type=='OPTION_LABEL'){
                                                  this.isoption = true;
                                                }else if(this.options[0].answer_type=='YES_NO_CANCEL'){
                                                  this.yes_no = true;
                                                }else if(this.options[0].answer_type=='IMAGE_OPTIONS'){
                                                  this.imageoption = true;
                                                }else if(this.options[0].answer_type=='CAMERA'){
                                                  this.camera = true;              
                                                }else{
                                                this.plain = false;
                                                this.isoption = false;
                                                this.yes_no = false;
                                                this.imageoption = false;
                                                this.camera = false;
                                                }
                                              }

                                              console.log("l&&&&&&&&&&&&&&&&&&======>",this.surveycontent.isEnd);
                                              
                                              if(this.surveycontent.isEnd==true){


                                                 console.log("entering")
                                                let alert = Alert.create({
                                                title: 'Thank u',
                                                subTitle: 'Thank u for attending survey',
                                                buttons: ['OK']
                                                 });

                                                this._navController.push(DetailPage);


                                              }

                                      }

                                       //end of data



                                  );
                               
                           },
                           (error) => {
                              console.log("ERROR" + JSON.stringify(error.err));
                           });

       
                },
              (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });


    }

  }



/*IN SERVICE*/
 getNextQuestion(s_id,nq_id):Observable<any>{

  /* console.log("getting next question")
         console.log("id",s_id);*/
       return Observable.create(observer => {

       console.log("c q id",nq_id)
       var quest_id = eval(nq_id)+1;
       console.log("here is incrementin question id",quest_id)
       var question_query="SELECT Id,The_question,survey_id FROM QUESTION WHERE survey_id= '"+ s_id+"' and order_in_survey ='"+quest_id+"' ";
        //console.log("question query",question_query);

           
           setTimeout(() => {

               this.storage.query(question_query).then((data) => {
                //console.log("datas are",data.res.rows);
                if(data.res.rows.length>0){
                  this.surveycontent.question=data.res.rows.item(0);
                  console.log("inside of incrementoing q id",quest_id)
                  this.surveycontent.NextquestionId=quest_id;
                  console.log("Next question id",this.surveycontent.NextquestionId)
                  
                  //here is getting option for question
                  this.getQuestionOptionsForQuestion(data.res.rows.item(0).Id).subscribe(
                     (data)=>{ observer.next(this.surveycontent.NextquestionId);}
                    )
                 
                  
                }
                else{
                 
                  this.surveycontent.NextquestionId=quest_id;
                  console.log("no result found");
                  console.log("asddddddddddddddddddddddddd0",this.surveycontent.NextquestionId);
                  if(this.surveycontent.NextquestionId!=0){
                    this.surveycontent.isEnd=true;
                    let alert = Alert.create({
                                                title: 'Survey ends',
                                                subTitle: 'Thank u for attending survey..Start a new survey',
                                                buttons: [
                                                {
                                                text: 'Ok',
                                            handler: () => {
                                            this.exitPage();
                                               }
                                                }
                                                ]

                                                 });
                     this._navController.present(alert);
                     // this._navController.push(DetailPage);


                  }
                  else{
                    this.surveycontent.isEnd=false;
                  }

                  console.log("seeing is end",this.surveycontent.isEnd);
                       

                      //
                }
             },//end of getting data
           (error) =>{
            
            });
           }, 1500);
        });
 }

 exitPage(){

   this._navController.push(DetailPage);
 }


getQuestionOptionsForQuestion(question_id):Observable<any>{

      return  Observable.create(observer=>{


        var option_query="SELECT id,question_id,answer,answer_image,answer_type FROM OPTION WHERE question_id="+question_id;

         this.storage.query(option_query).then((data) => {

                     console.log("options arw",data.res.rows)                   
                     this.surveycontent.QuestionOptions=[];
                     this.f_options=[];
                     if(data.res.rows.length>0){
                       for(var i=0; i<data.res.rows.length; i++){            
                   
                         this.f_options.push(data.res.rows.item(i));
                   
                        } 

                        this.surveycontent.QuestionOptions=this.f_options;
                        console.log("=========",this.surveycontent.QuestionOptions)
                        observer.next(this.surveycontent.QuestionOptions);
                    }
                    else{
                      console.log("no question found")
                    }
                   

                
            }, (error) => {

                console.log("ERROR -> " + JSON.stringify(error.err));

            });



        })

}



}
