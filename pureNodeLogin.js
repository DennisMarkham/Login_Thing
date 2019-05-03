var mysql = require("mysql");
var inquirer = require("inquirer");

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
  start()
});

function start()
{
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
       name: "mainMenu",
      type: "rawlist",
      message: "Chose an action:",
      choices: ["Sign Up", "Log In", "List Users"]
    }
    ]).then(function(inquirerResponse) {
if (inquirerResponse.mainMenu == "Sign Up")
{
  signUp();
}

if (inquirerResponse.mainMenu == "List Users")
{
  listUsers();
}

    })
 
}







function signUp()
{
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your username?",
      name: "username"
    },
 
    // Here we create a basic password-protected text prompt.
    {
      type: "password",
      message: "Set your password",
      name: "password"
    }
  ])
  .then(function(inquirerResponse) {
var pw = inquirerResponse.password;
var un = inquirerResponse.username;
    if (pw.match(".*\\d*.*") && pw.match(".*\\w*.*") && pw.length > 6) 
    {
      console.log("\nWelcome " + un);

      connection.query("INSERT INTO people (username, password) VALUES ('" + un + "', '" + pw + "')" , function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  })
    }
    else {
      console.log("Password invalid.  Try again.");
    }
  });
}


function listUsers()
{
  connection.query("SELECT * FROM people" , function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
})
}