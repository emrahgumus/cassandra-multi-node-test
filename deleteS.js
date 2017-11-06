var cassandra = require('cassandra-driver');
var express = require('express');
var app = express();
var request = require('request');

var client = new cassandra.Client({
 contactPoints: ['127.0.0.1'], //['192.168.10.74','192.168.10.75','192.168.10.76'],
// authProvider  : new cassandra.auth.PlainTextAuthProvider('cassandra', 'pass'),
queryOptions: { consistency: cassandra.types.consistencies.two }
});
client.connect(function(err,result){
	console.log(err);
});


var myCounter=1;
//app.get('/', function (req, res) {
setInterval(function(){

	var getUsers = "select * from demo.users where userid > '1509427438611' limit 1 ALLOW FILTERING";

	client.execute(getUsers,[], function(err,result){
//console.log(result);
if(result.rows.length == 0){
        console.log("!hata: select");
        console.log(err);
}else{
		var uid = result.rows[0]['userid'];

		client.execute("delete from demo.users where userid = '"+uid+"'", [], function(err,result){
		request('http://192.168.10.76:3000/?type=delete&uid='+uid, function (error, response, body) {
                        if(error)
                        console.log('error:', "76 gitti");
			else
			console.log('1     '+uid);
                });
	});
}
  	});



  //res.send('Hello World')
},250);
 




/*
var getUsers = "SELECT count(*) FROM demo.users";

  
  client.execute(getUsers,[],function(err,result){

	console.log(result.rows);
  	

  });

var myCounter=1;

setInterval(function () { 
	//var date = new Date();
	var timeInMss = new Date().getTime();
	console.log(timeInMss);
	
	//var sql = "INSERT INTO demo.users (name,email,address) values('name"+timeInMss+"','email"+myCounter+"','addr"+myCounter+"')";
	
	var sql = "INSERT INTO demo.users (userid, age, city, email, firstname, lastname) values ('"+timeInMss+"',"+myCounter+",'city','email','fname','lname')";

	client.execute(sql,[],{ consistency: cassandra.types.consistencies.one },function(err,result){
		if(err){

                      console.log("!!!!!!!!!!!!!!!!!!!!!!!! " + err + "!!!!!!!!!!!!!!!!!!!!!!");
                }

//		console.log(result);
		myCounter++;
	});
    //console.log('second passed'); 
}, 100); */
