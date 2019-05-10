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

if (inquirerResponse.mainMenu == "Log In")
{
  logIn();
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
      //***checking if username is taken
      connection.query("SELECT * FROM people" , function(err, res) {
      for (var i = 0; i < res.length; i++) {
              if (res[i].username == un)
              {
                console.log("username taken")
                connection.end();
              }
            }
            connection.query("INSERT INTO people (username, password) VALUES ('" + un + "', '" + pw + "')" , function(err, res) {
    // if (err) throw err;
    if (err)
    {
      console.log("Goodbye")
    }
    else
    {
    console.log("Welcome " + un + "!");
    memberMenu(un);
  }
  })
          });
      //*** checking if username is taken

      //*** inserting data
      
    //*** inserting data
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
    for (var i = 0; i < res.length; i++) {
              console.log(res[i].username);
            }
    // console.log(res.username);
    connection.end();
})
}

function logIn()
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
      message: "What is your password",
      name: "password"
    }
  ])
  .then(function(inquirerResponse) {
var pw = inquirerResponse.password;
var un = inquirerResponse.username;
var valid = false;  
    connection.query("SELECT * FROM people" , function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
              if (res[i].username == un  && res[i].password == pw)
              {
                console.log("Welcome back " + res[i].username + "!")
                valid = true;
                memberMenu(un);
              }
            }
    if (valid == false)
    {
      console.log("Invalid username or password.")
    }
    // console.log(res.username);
    // connection.end();
})

  });
}

function memberMenu(user)
{
  var user = user;
inquirer
  .prompt([
    // Here we create a basic text prompt.
    
    {
     name: "mM",
      type: "rawlist",
      message: "Main Menu",
      choices: ["Delete Account", "Logout"]
    }
  ])
  .then(function(inquirerResponse) {
var answer = inquirerResponse.mM;
if (answer == "Delete Account")
{
deleteAccount(user);
}
else
{
  connection.end();
}
});
}

function deleteAccount(user)
{
  var user = user;
inquirer
  .prompt([
    // Here we create a basic text prompt.
    
    {
     name: "delete",
      type: "rawlist",
      message: "Do you want to delete your account",
      choices: ["No", "Yes"]
    }
  ])
  .then(function(inquirerResponse) {
var answer = inquirerResponse.delete
if (answer == "Yes")
{
connection.query("DELETE FROM people WHERE username = '" + user + "'", function(err, res) {
  console.log(res);  
    connection.end();
    //cannot quit after invoking quit!? What does that mean.
})
}
else
{
  memberMenu();

}

});
}