const mysql = require("mysql");
const uuid = require('../config/secureUuid').uuid()
// const bcrypt = require('bcryptjs');

const databaseConnection = require("../model/databaseTable");
let db = databaseConnection;




exports.loginHandler = (req, res) => {

  let session = req.session
  let { email, password } = req.body;
  if (!(email && password)) {
    return res.render("login", { error_msg: "please enter fields" });
  }

  // quey db for existinf email
  db.query('SELECT * FROM user WHERE email = ?', [email],  (error, results) =>{

    if (error) {
      req.flash("error_msg", "Error from server Database, try again")
     return res.redirect("/"); 
    }

        var resultAsString = JSON.stringify(results);
        var user = JSON.parse(resultAsString);
    
     if (user.length <= 0) {
          return res.render('login', {error_msg: "email does not"})
          }else if (user[0].password != password) {
            return res.render('login', {error_msg: "incorrect email or password"})
          } else {
            session.user = user[0];
            res.redirect('/welcome')
          }
  
  // comparing the password with the hashed password
  //    await bcrypt.compare(password, results[0].password, (error, response) =>{
  //         if(response) {
  //             // creating a session cookie for the user
  
  //             res.send(`${userName} loged in as admin`)
  //             }else{
  //                 console.log(error)
  //                 return console.log("wrong credentials");
  //             }
  //     });

  })
  
};
