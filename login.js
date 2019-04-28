//SERVER STUFF

var http = require("http");
var fs = require("fs");

// Set our port to 8080
var PORT = 8080;

// Create our server
var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {

  // Here we use the fs package to read our index.html file
  fs.readFile(__dirname + "/index.html", function(err, data) {

    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

// Starts our server
server.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});
//*****

//*** SQL stuff
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "users_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});
//*** SQL stuff

	// var pw = $("#psw").val();

		function checkPw()
		{
		pw = $("#psw").val();
		un = $("#un").val()
		console.log(pw);

		//currently checks if password has at least 2 digits, 2 letters, and is at least 6 //characters long. Putting bracket thing on end results in an error.  Maybe I should ask 
		//stack overflow
		if (pw.match(".*\\d{2}.*") && pw.match(".*\\w{2}.*") && pw.length > 6)
		{
		console.log("Checks out.")
		//then it sends the username and password to an SQL database.	

		//SQL STUFF*********************
		connection.query("INSERT INTO users_db (username, password) VALUES ('" + un + "', '" + pw + "')" , function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });	
		//SQL STUFF *************
		}



		}