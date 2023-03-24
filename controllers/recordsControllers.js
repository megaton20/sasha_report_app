
const databaseConnection = require("../model/databaseTable");
let db = databaseConnection;
const dayName = require('../model/dayOfWeek')
const monthName = require('../model/month')

let myToday = new Date().toLocaleDateString()
let presentDay = dayName(myToday, '/')
let myMonth = new Date().toLocaleDateString()
let presentMonth = monthName(myMonth, '/')


exports.dataLandingPage = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    // select user first to know if it is user or admin
    db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
      if (err) {
        console.log(err)
        req.flash('warning_msg', "Problem getting data from db! ")
        res.redirect('/welcome')
      } else {
         let loggedRole =  results[0].role
        // check role, if role is user or admin to have seperate function
              if (loggedRole == "admin") {   
                res.render("months", {
                  name:email,
                })
        } else {
          req.flash("warning_msg", "sorry you cannot view previous data, just provide the records and forget about it")
          return  res.redirect('/welcome')
        }
      }
    })
}

exports.getJanuary = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
    // select user first to know if it is user or admin
    db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
      if (err) {
        req.flash('warning_msg', "Problem getting data from db! loging again ")
        res.redirect('/')
      } else {
         let loggedRole =  results[0].role
        // check role, if role is user or admin to have seperate function
        if (loggedRole == "admin") {
                // to get the total of the month
                db.query("SELECT total FROM January", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM January ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          req.flash('warning_msg', "Problem getting data from db! try again ")
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"January"
                          });
                        }
                        });
                  } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }
  
exports.getFebruray = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM February", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM February ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month: "February"
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

exports.getMarch = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM March", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM March ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                          });
                        }
                        });
                     } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getApril = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM April", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM April ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"April"
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getMay = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM May", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM May ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"May",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getJune = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM June", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM June ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"June",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getJuly = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM July", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM July ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"July",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getAugust = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM August", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM August ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"August",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getSeptember = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM September", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM September ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"September",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getOctober = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM October", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM October ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"October",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getNovember = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM November", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM November ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"November",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }

  exports.getDecember = (req, res)=> {
    // global declerations
    const email = req.session.user.email
    let totalPrinted = 0;
 
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
                // to get the total of the month
                db.query("SELECT total FROM December", (err, results)=> {
                          if(err){
                            console.log(err)
                          }else{
                            
                            for(let i = 0; i < results.length; i++){
                              totalPrinted += results[i].total
                            }
                            
                          }
                })
                // all reports based on user role for that month
                db.query(`SELECT * FROM December ORDER BY sn DESC` , (err, results) => {
                        if (err) {
                          console.log(err)
                          return res.redirect("/welcome");
                        } else {
                          let resultsAsString = JSON.stringify(results);
                          let data = JSON.parse(resultsAsString);
          
                          // todo render admin reports not all reports
                          res.render("admin", {
                            sum:totalPrinted,
                            name:email,
                            data,
                            month:"December",
                          });
                        }
                        });
                      } else {
                        req.flash('warning_msg', "not available for users")
                      return res.redirect('/welcome')
                  }
      }
    })
  }