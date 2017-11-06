var cassandra = require('cassandra-driver');
var express = require('express');
var app = express();


var client = new cassandra.Client({
 contactPoints: ['127.0.0.1'], //['192.168.10.74','192.168.10.75','192.168.10.76'],
// authProvider  : new cassandra.auth.PlainTextAuthProvider('cassandra', 'pass'),
queryOptions: { consistency: cassandra.types.consistencies.two }
});
client.connect(function(err,result){
	console.log(err);
});


var myCounter=1;
app.get('/', function (req, res) {

if(req.query.type == 'insert'){	
	var getUsers = "SELECT * FROM demo.users WHERE userid = '"+req.query.lastId+"'";
	client.execute(getUsers,[],function(err,result){

		msg = '';
		if(err)
			msg = "!!!ERR_insert_select!!!"+err+" - "+req.query.lastId;
		else if(result.rows.length != 0)
			msg = "1      "+req.query.lastId;
		else 
			msg = "!!!! 0_insert_veri_yok "+req.query.lastId;

		console.log(msg);
		res.send(msg);
		
  	});

}else if(req.query.type == 'update'){


        var getUsers = "SELECT * FROM demo.users WHERE userid = '"+req.query.uid+"'";
        client.execute(getUsers,[],function(err,result){

                msg = '';
                if(err)
                        msg = "!!!ERR_update_select!!!"+err;
                else if(result.rows[0]['email'] == 'email')
                        msg = "!!                     update_hata_degismemis "+req.query.uid;
                else
                        msg = "               1  "+req.query.uid;

                console.log(msg);
                res.send(msg);

        });



}else{

	var getUsers = "SELECT * FROM demo.users WHERE userid = '"+req.query.uid+"'";
        client.execute(getUsers,[],function(err,result){
        
                msg = '';
                if(err)
                        msg = "!!!ERR_delete_select!!!"+err;
                else if(result.rows.length != 0)
                        msg = "!!                     del_kayit var "+req.query.uid;
                else    
                        msg = "                     1  "+req.query.uid;
                        
                console.log(msg);
                res.send(msg);
                
        });

}

  //res.send('Hello World')
});
 
app.listen(3000);




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
