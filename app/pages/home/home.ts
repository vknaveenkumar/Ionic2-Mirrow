import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Storage,LocalStorage,SqlStorage} from 'ionic-angular';
import {DbContent} from '../../service/dbContent';
import  {DetailPage} from '../profile/profile';
@Component({
	templateUrl: 'build/pages/home/home.html',
	providers: [DbContent]
})
export class HomePage {

	storage;
	constructor(private navController: NavController, private dbContent:DbContent) {

	}

  signup(credentials){
	  console.log("Sign uP Function is called",credentials);
	  
	  var username = credentials.username;
	  var password = credentials.password;
	  var email = credentials.username;
      //var query = "insert into user values (" + ? + "," + username + "," + password + "," + email + ")";
      //var query = "insert into user values(?,'sdas','adsadsa','dasdsad')";
      
	    let options = {name :"mirrow"};
		this.storage = new Storage(SqlStorage, options);
		


        var query = "insert into user (username, password,email) values ('"+ username +"','" + password + "','" + email + "')";
		console.log("cxvcxv", query);
		//var query = "INSERT INTO user(username,password,email) VALUES('goodboy','12345','ssssh@gmail.com')";
		this.storage.query(query).then((data) => {
		  alert("account created")
		  },
         (error) => {
            console.log("ERROR" + JSON.stringify(error.err));
        });
	 

	  }


  login(credentials){
	  console.log("Login function is called", credentials)
       
      var username = credentials.username;
	  var password = credentials.password;


	  let options = {name :"mirrow"};
	  this.storage = new Storage(SqlStorage, options);

	  var query = "SELECT * FROM user WHERE email='" + username + "' AND password='" + password + "'";
	  console.log(query);
     
	  this.storage.query(query).then((data) => {

                if(data.res.rows.length > 0) {
                   /* for(var i = 0; i < data.res.rows.length; i++) {
                        this.people.push({firstname: data.res.rows.item(i).firstname, lastname: data.res.rows.item(i).lastname});
                    }*/
                    console.log("data found")
                    this.navController.push(DetailPage);
                    //alert("login passed")
                }
                else{
					alert("login failed");
                }
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });




  }


}
