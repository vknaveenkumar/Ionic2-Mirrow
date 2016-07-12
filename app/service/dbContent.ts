import { Injectable }     from '@angular/core';

import {Storage,LocalStorage,SqlStorage} from 'ionic-angular';

@Injectable()
export class DbContent {
 

	storage: any;
 
   n :string;


   //called from app.ts
	databaseProperties(){
		 this.createDatabase();

			return Promise.all([

        this.surveyTable(),
				this.route(),
				this.client(),
				this.country(),
				this.productTable(),
				this.surveyResults(),
				this.store(),
				this.user(),
				this.questionQuery(),
        this.insertSurvey(),
				this.options(),
        this.insertRoute(),
        this.insertStore(),
        this.insertRecords()
        
        
       ]);
	}

   
   createDatabase(){
	   	console.log("In creating database.....");
		let options = {name :"mirrow"};
		this.storage = new Storage(SqlStorage, options);
		console.log("DB Created.....");
	 }


options(){

	var options = "CREATE TABLE IF NOT EXISTS option ( "+
				"id            bigint NOT NULL PRIMARY KEY ,"+
				"question_id   bigint NOT NULL,"+
				"answer        text,"+
   				"answer_image  text,"+
				"answer_type   varchar(200)"+
				")";
		this.executeTable(options);
  }



   questionQuery() {
	   var question_query = "CREATE TABLE IF NOT EXISTS question (Id bigint NOT NULL  PRIMARY KEY ,"+
				  "The_question     text,"+
				  "Display_type     text,"+
				  "answer_id        bigint,"+
			 	 "Order_in_survey  bigint,"+
   				  "Group_name       text,"+
				  "Group_id         bigint,"+
				  "Rank_importance  bigint,"+
				  "Created_by       bigint,"+
				  "Created_date     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
				  "Updated_by       bigint,"+
				  "Up dated_date     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
	    		 "survey_id        bigint NOT NULL)";

		this.executeTable(question_query);
   }





   user() {
	   var user = "CREATE TABLE IF NOT  EXISTS user("+
                "Id INTEGER NOT NULL PRIMARY KEY,"+
                "username varchar(255),"+
                "password varchar(255),"+
                " email varchar(255));"
	   this.executeTable(user);
	  /* var query = "INSERT INTO user VALUES(1,'ssss','12345','ssssh@gmail.com')";
	   console.log("inserting")
       this.executeTable(query);*/

   }

   store() {

	   var store = "CREATE TABLE IF NOT EXISTS store ("+
					  "store_id    bigint NOT NULL PRIMARY KEY,"+
  					   "store_name  varchar(255),"+
					  "location    varchar(255),"+
  					   "route_id     bigint NOT NULL);"
		    this.executeTable(store);
     }

 
   surveyResults(){
	 var surveyResults = "CREATE TABLE IF NOT EXISTS survey_results ("+
       					"Id bigint NOT NULL PRIMARY KEY,"+
          				 "question_id  bigint NOT NULL,"+
      					"option_id    bigint ,"+
        				"client_id    bigint NOT NULL,"+
      					"product_id   bigint NOT NULL,"+
          				"T NULL,"+
	        			"survey_id    bigint NOT NULL,"+
		   	 	         "user_id      bigint NOT NULL,"+
 						"answer       text)";

	    this.executeTable(surveyResults);
   }

   surveyTable(){                      
	  var survey = "CREATE TABLE IF NOT EXISTS survey ("+
            "Id  bigint NOT NULL PRIMARY KEY ,"+
             "Survey_name         text,"+
            "Survey_description  text,"+
            "Survey_notes        text,"+
            "Client_name         text,"+
            "Client_id           bigint,"+
            "Store_id           bigint,"+
            "Product_name        text,"+
            "Product_id          bigint,"+
            "Country_name        text,"+
            "Country_id          bigint);"

	  this.executeTable(survey);
   }

 
  insertSurvey(){
  var insert_survey_query="";

 // var insert_route_query = "INSERT INTO route VALUES(1,'routeName ','Chennai')";
  
  insert_survey_query = "INSERT INTO survey VALUES(1,'surveyName1','Survey_description','Survey_notes','Client_name',1,1,'Product_name',1,'Country_name',1)";
  //console.log("in inserting survey")
  this.executeInsert(insert_survey_query); 

  insert_survey_query = "INSERT INTO survey VALUES(2,'surveyName2','Survey_description2','Survey_notes2','Client_name2',2,2,'Product_name2',2,'Country_name2',2)";
  this.executeInsert(insert_survey_query);

  insert_survey_query = "INSERT INTO survey VALUES(3,'surveyName3','Survey_description3','Survey_notes3','Client_name3',3,3,'Product_name3',3,'Country_name3',3)";
  this.executeInsert(insert_survey_query);

  }


  insertRecords(){

    var insert_question_query ="";

    insert_question_query="INSERT INTO question VALUES(1,' Coke Zero is better or Diet Coke ? ','PLAIN_TEXT',NULL,1,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";  
     this.executeInsert(insert_question_query);      
        
    insert_question_query="INSERT INTO question VALUES(2,' What Coca Cola products you see in store ? ','OPTION_LABEL',NULL,2,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)"; 
    this.executeInsert(insert_question_query);       
              
    insert_question_query="INSERT INTO question VALUES(3,'What is your preference?','IMAGE_OPTIONS',NULL,3,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";        
    this.executeInsert(insert_question_query);

    insert_question_query="INSERT INTO question VALUES(4,' Will you recommend Diet Coke to your peers ? ','YES_NO_CANCEL',NULL,4,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";        
    this.executeInsert(insert_question_query);
        
    insert_question_query="INSERT INTO question VALUES(5,'What is your opinion for other brands like Pepsi ? ','PLAIN_TEXT',NULL,5,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)"; 
    this.executeInsert(insert_question_query);       
                
    insert_question_query="INSERT INTO question VALUES(6,'How frequently you have Pepsi ? ','CAMERA',NULL,6,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";             
    this.executeInsert(insert_question_query);  


    insert_question_query="INSERT INTO option VALUES(1,1,'','','PLAIN_TEXT')";    
    this.executeInsert(insert_question_query);    
       
    insert_question_query="INSERT INTO option VALUES(2,2,'Coke','','OPTION_LABEL')";        
    this.executeInsert(insert_question_query); 
       
        insert_question_query="INSERT INTO option VALUES(3,2,'Fanta','','OPTION_LABEL')";        
         this.executeInsert(insert_question_query); 
        
        insert_question_query="INSERT INTO option VALUES(4,2,'Diet Coke','','OPTION_LABEL')";        
        this.executeInsert(insert_question_query); 
        
        insert_question_query="INSERT INTO option VALUES(5,3,'img/perry.png','','IMAGE_OPTIONS')";        
        this.executeInsert(insert_question_query); 
        
        insert_question_query="INSERT INTO option VALUES(6,3,'img/mike.png','','IMAGE_OPTIONS')";        
       this.executeInsert(insert_question_query); 

        insert_question_query="INSERT INTO option VALUES(7,4,'Yes','','YES_NO_CANCEL')";        
        this.executeInsert(insert_question_query); 

        insert_question_query="INSERT INTO option VALUES(8,4,'No','','YES_NO_CANCEL')";        
        this.executeInsert(insert_question_query); 
       
        insert_question_query="INSERT INTO option VALUES(9,5,'','','PLAIN_TEXT')";        
        this.executeInsert(insert_question_query); 

        insert_question_query="INSERT INTO option VALUES(10,6,'','','CAMERA')";              
        this.executeInsert(insert_question_query); 
            
  }

  
  route(){   
	  var route = "CREATE TABLE IF NOT  EXISTS route("+
                        "Id bigint NOT NULL PRIMARY KEY,"+
                        "route_name  text,"+
                        "location    text);"
	  this.executeTable(route);
  }


client(){

	var client = "CREATE TABLE IF NOT  EXISTS client ("+
        			  "Id             INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
        			  "Client_id      bigint,"+
        			  "Client_name    text,"+
        			  "Notes          text,"+
        			  "Createdby      bigint,"+
        			  "Create_Date    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
        			  "Modifiedby     bigint,"+
        			  "Modified_Date  timestamp NOT NULL);"   
			this.executeTable(client); 
  }

   country(){
	 var country = "CREATE TABLE IF NOT  EXISTS country ("+
        				  "Id bigint NOT NULL PRIMARY KEY,"+
        				  "Common_Name            text,"+
      				  "Formal_Name            text,"+
       				  "Iso_three_letter_code  text,"+
        				  "Capital                text,"+
        				  "Currency_Name          text,"+
        				  "Telephone_code         text);"
	          	this.executeTable(country);
	 }



	productTable() {

		var productTable = "CREATE TABLE IF NOT  EXISTS  product (" +
        				"Id  bigint NOT NULL PRIMARY KEY," +
						"Product_name   text," +
        				"Product_notes  text," +
        				"Created_by     bigint," +
        				"Created_date   timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        				"Modified_by    bigint," +
        				"Modified_date  timestamp NOT NULL);"

		this.executeTable(productTable);
	}


insertRoute(){
   console.log("in inserting route");
    var insert_route_query ="";
    var routeResult="";
    

    insert_route_query = "INSERT INTO route VALUES(1,'routeName ','Chennai')";
    this.executeInsert(insert_route_query);

     insert_route_query = "INSERT INTO route VALUES(2,'routeName ','Kolkatta')";
    this.executeInsert(insert_route_query);

     insert_route_query = "INSERT INTO route VALUES(3,'routeName ','mumbai')";
    this.executeInsert(insert_route_query); 
  }



  getRoutes(){
    console.log("In get route function");

     var select_route_query = "SELECT * FROM route";
     this.executeTable(select_route_query);

  }


  insertStore(){
    var insert_store_query="";
    
    insert_store_query = "INSERT INTO store VALUES(1,'storeName 1','Chennai',1)";
    this.executeInsert(insert_store_query);

    insert_store_query = "INSERT INTO store VALUES(2,'storeName2','kolkata',2)";
     this.executeInsert(insert_store_query);

    insert_store_query = "INSERT INTO store VALUES(3,'storeName3','Mumbai',3)";
     this.executeInsert(insert_store_query);
  }

  



   

  executeTable(query){

		 this.storage.query(query).then((data) => {
                console.log("data is ",data);
                console.log("TABLE CREATED");
            },
         (error) => {
            console.log("ERROR" + JSON.stringify(error.err));
            });
  }

  
 executeInsert(query){
  /*  var query="SELECT * FROM route";*/
    //console.log("execute query is",query)
     this.storage.query(query).then((data) => {
                console.log("In inserting=======================",data.res.insertId)
                //alert(data.res.insertId)

            },
         (error) => {
            console.log("ERROR" +error.err);
            });

  }




}








