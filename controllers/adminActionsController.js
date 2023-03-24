
const databaseConnection = require("../model/databaseTable");
let db = databaseConnection;



exports.getRegisterPage =  (req, res) =>{
    const sessionEmail = req.session.user.email
      // select user first to know if it is user or admin
      db.query(`SELECT * FROM user WHERE email = "${sessionEmail}"`, (err, results) => {
        if (err) {
            console.log(err)
            req.flash("error_msg", "error from dataase while creating new user...")
            return res.redirect('/')
        }else{
            let loggedRole =  results[0].role
            if (loggedRole == "admin") {
                res.render('register', {
                  name:sessionEmail
                })
            } else {
                req.flash("warning_msg", "log in as admin to create an employee")
                res.redirect('/welcome')
            }
        }
    })
    
}

exports.registerHandler = (req, res) => { 
    let error = [];
    const {
      email, phone, password, password2, firstName, lastName, state, LGA, gender,} = req.body;
    const sessionEmail = req.session.user.email
        // select user first to know if it is user or admin
        db.query(`SELECT * FROM user WHERE email = "${sessionEmail}"`, (err, results) => {
          if (err) {
            req.flash('warning_msg', 'sorry... database error while trying to create user')
           return res.redirect('/welcome')
          }else {
            let loggedRole =  results[0].role
            if (loggedRole == "admin") {
              
    // check all fields 
  
          if ( (email && phone && password && password2 && firstName && lastName && state && LGA && gender) == ""){
              error.push({ msg: "enter all fields" });
                return res.render("register", { error_msg: " enter all fields", name:sessionEmail });
          }else if (password !== password2) {
              error.push({ error_msg: "passwords do not match" });
                return res.render("register", { error_msg: " password do not match", name:sessionEmail });
          }else if(LGA == "LGA") {
                error.push({ error_msg: "Select LGA" });
                res.render('register', {error_msg: "You should select your Local Government Area", name:sessionEmail})
          }
  
            if (error.length > 0) {
                return res.render("register", {
                    error, email, phone, password, password2, firstName, lastName, name:sessionEmail
                });
                }else{ db.query("SELECT email FROM user WHERE email = ?",[email],(error, results) => {
                        if (error) {
                          req.flash('warning_msg', 'sorry... database error while trying to create user')
                          return res.redirect('/welcome')
                        }
                
                        if (results.length > 0) {
                        return res.render("register", { error_msg: "Email is taken", name:sessionEmail });
                        }
  
        // this section is to encrypt the password before sending it to the database
        //    const saltRounds = 10;
        //    let hashedPassword =await bcrypt.hash(password, saltRounds);
        //    console.log(`this is the hashed Password:  ${hashedPassword}`);
  
        const uuid = require('uuid').v4()
  
        // adding to the database
        db.query("INSERT INTO user SET ?",{id:uuid,
          email: email,
          password: password,
          phone: phone,
          first_name:firstName,
          last_name:lastName,
          state:state,
          lga:LGA,
          gender: gender,
          }, (error, results) => {
            if (error) {
              console.log(error);
              return res.render("register", {
                error_msg: `${email} could not be added to database`,
              });
            } else {
              req.flash('success_msg', `${firstName + " " + lastName} has been registered successfully`)
              return res.redirect('/welcome')
            }
          });
      });
    }
  } else {
    req.flash("warning_msg", "Log in as admin to create new employee")
    return res.redirect('/')
  }
}
})
};
//   get all users
exports.getAllUser = (req, res) => {
  const email = req.session.user.email
      // select user first to know if it is user or admin
      db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
        if (err) {
          console.log(err)
          req.flash('warning_msg', "Problem getting data from db! ")
          res.redirect('/')
        } else {
           let loggedRole =  results[0].role
          // check role, if role is user or admin to have seperate function
          if (loggedRole == "admin") {
                  // all reports based on user role for that month
                  db.query(`SELECT * FROM user` , (err, results) => {
                          if (err) {
                            req.flash('error_msg', "Error from database, try again in later")
                            return res.redirect("/welcome");
                          } else {
                            let resultsAsString = JSON.stringify(results);
                            let data = JSON.parse(resultsAsString);
                            res.render("adminViewUsers", {
                              name:email,
                              data,
                            });
                          }
                          });
                } else {
                  // for user
                      req.flash('warning_msg', "You cannot view that resource")
                      return res.redirect('/welcome')
                }
        }
      })
}
// get single user
exports.getSingleUser = (req, res)=> {

  let email = req.session.user.email
  let userProfile = req.params.id
      // select user first to know if it is user or admin
      db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
        if (err) {
          console.log(err)
          req.flash('warning_msg', "Problem getting data from db! ")
          res.redirect('/')
        } else {
           let loggedRole =  results[0].role
          // check role, if role is user or admin to have seperate function
          if (loggedRole == "admin") {
                  // all reports based on user role for that month
                  db.query(`SELECT * FROM user WHERE id = "${userProfile}"` , (err, results) => {
                          if (err) {
                            req.flash('error_msg', "Error from database, try again in later")
                            return res.redirect("/welcome");
                          } else {
                            let resultsAsString = JSON.stringify(results);
                            let data = JSON.parse(resultsAsString);
                            let fullName = `${data[0].first_name} ${data[0].last_name}`

                            // todo render admin reports not all reports
                            res.render("userProfile", {
                              name:email,
                              data,
                              fullName:fullName
                            });
                          }
                          });
                } else {
                  // for user
                      req.flash('warning_msg', "You cannot you can only view your profile")
                      return res.redirect('/welcome/profile')
                }
        }
      })
}

exports.deleteUser =(req, res)=>{
  let email = req.session.user.email
  let userProfile = req.params.id
      // select user first to know if it is user or admin
      db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
        if (err) {
          console.log(err)
          req.flash('warning_msg', "Problem getting data from db! ")
          res.redirect('/')
        } else {
          // asigning the role
           let loggedRole =  results[0].role
          // check role, if role is user or admin to have seperate function
          if (loggedRole == "admin") {
            // query for that user by id to make sure a user can't delete themselves

            db.query(`SELECT * FROM user WHERE id = "${userProfile}"`, (err, results) => {
              if(err) {
                req.flash("error_msg", "user delete can't work now, restart the server and try again! ")
               return res.redirect("/welcome");
              }
              if (results[0].email !== email) {
                db.query(`DELETE FROM user WHERE id = "${userProfile}"` , (err, results) => {
                     if (err) {
                         req.flash('error_msg', "Error from database, try again in later")
                         return res.redirect("/welcome");
                           } else {
                              req.flash("success_msg", "user deleted! ")
                              res.redirect("/welcome");
                           }
                       });
             } else {
                 // for user
                 req.flash('error_msg', "You cannot remove yourself")
                 return res.redirect('/welcome/')
             }
            })
                
                } else {
                  // for user
                      req.flash('warning_msg', "You cannot remove a user")
                      return res.redirect('/welcome')
                }
        }
      })
}
