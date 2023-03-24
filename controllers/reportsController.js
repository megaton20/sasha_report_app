
const databaseConnection = require("../model/databaseTable");
let db = databaseConnection;
const dayName = require('../model/dayOfWeek')
const monthName = require('../model/month')

let myToday = new Date().toLocaleDateString()
let presentDay = dayName(myToday, '/')
let myMonth = new Date().toLocaleDateString()
let presentMonth = monthName(myMonth, '/')


exports.getReport = (req, res) => {

  // global declerations
      const email = req.session.user.email
      let totalPrinted = 0;
      let totalPosted = 0;
      let otherWhoPosted = 0;

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
                  db.query(`SELECT total FROM ${presentMonth} `, (err, results)=> {
                            if(err){
                              console.log(err)
                            }else{
                              
                              for(let i = 0; i < results.length; i++){
                                totalPrinted += results[i].total
                              }
                              
                            }
                  })
                          
                  // number a user has posted
                   db.query(`SELECT * FROM ${presentMonth} ORDER BY sn DESC` , (err, results) => {
                            if (err) {
                              console.log(err)
                              // req.flash("error_msg", `could not fetch for the month of ${presnstMonth}`)
                              return res.redirect("/welcome");
                            } else {
                              totalPosted = results.length
                            }
                  })
                  // all reports based on user role for that month
                  db.query(`SELECT * FROM ${presentMonth} ORDER BY sn DESC` , (err, results) => {
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
                              month:presentMonth,
                            });
                          }
                          });
          } else {
            // for user
                // to get the total of the month
              db.query(`SELECT total FROM ${presentMonth} `, (err, results)=> {
                if(err){
                  console.log(err)
                }else{
                  
                  for(let i = 0; i < results.length; i++){
                    totalPrinted += results[i].total
                  }
                  
                }
              })
              
              // number a user has posted
              db.query(`SELECT * FROM ${presentMonth} WHERE email = "${email}" ORDER BY sn DESC` , (err, results) => {
                if (err) {
                  console.log(err)
                  res.render("allReports");
                } else {
                  totalPosted = results.length
                  
                }
              })
              // all reports based on user role for that month
            db.query(`SELECT * FROM ${presentMonth} WHERE email = "${email}" ORDER BY sn DESC` , (err, results) => {
              if (err) {
                  res.render("allReports");
                  console.log(err);
              } else {
                let resultsAsString = JSON.stringify(results);
                let data = JSON.parse(resultsAsString);

                if (data == []) {
                  return res.redirect('/')
                } else {
                  res.render("allReports", {
                    sum:totalPrinted,
                    mine: totalPosted,
                    others:otherWhoPosted,
                    name:email,
                    data,
                    month:presentMonth,
                    nextPage: "#",
                    previousPage: "#",
                  });
                }
              }
              });
          }
        }
      })

}

exports.getEditPage = (req, res) => {

  let editPostId = req.params.id;
  let email = req.session.user.email

  db.query(`SELECT * FROM user WHERE email = "${email}"` , (err, results) => { 
    if (err) {
      console.log(err)
      req.flash("warning_msg", "error from database... try agian")
      return res.redirect('/welcome')
    } else {
      let loggedRole =  results[0].role
      if (loggedRole == "user") {
          // Db query
          db.query(
            `SELECT * FROM ${presentMonth} WHERE id = "${editPostId}"`,
            (err, results) => {
              if (err) {
                console.log(err);
              } else {
                let resultsAsString = JSON.stringify(results);
                let data = JSON.parse(resultsAsString);
                res.render("editPost", { data,name:email });
              }
            }
          );
      } else {
        req.flash("warning_msg", "cannot edit as an admin")
        res.redirect('/welcome')
      }
    }

  })

}

exports.getCreateReportPage = (req, res) => {


  let email = req.session.user.email
  let createdTime = new Date().toLocaleTimeString();
  let createdDate = new Date().toLocaleDateString();


    // select user first to know if it is user or admin
    db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
      if (err) {
        console.log(err)
        req.flash('error_msg', "An error from database!")
        res.redirect('/')
      } else {
        let loggedRole =  results[0].role
        if (loggedRole == "admin") {
          req.flash('warning_msg', "You cannot create a report!")
          res.redirect('/welcome')
        } else {
          res.render("createPost", {
            time: createdTime,
            date: createdDate,
            name:email
        
          });
        }
      }
    })

}

exports.getReadmorePage = (req, res) => {

  let reflectionID = req.params.id;
  let email = req.session.user.email

  // query to render different pages for admin and for user
  db.query(`SELECT * FROM user WHERE email = "${email}"` , (err, results) => { 
    if (err) {
      console.log(err)
    } else {
      let loggedRole =  results[0].role
      if (loggedRole == "admin") {
        db.query(
          `SELECT * FROM ${presentMonth} WHERE id = "${reflectionID}"`,
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              let resultsAsString = JSON.stringify(results);
              let data = JSON.parse(resultsAsString);
              res.render("reflectionsAdmin", { data, name:email });
            }
          }
        );
      }else{
          // Db query
          db.query(
            `SELECT * FROM ${presentMonth} WHERE id = "${reflectionID}"`,
            (err, results) => {
              if (err) {
                console.log(err);
              } else {
                let resultsAsString = JSON.stringify(results);
                let data = JSON.parse(resultsAsString);
                res.render("reflections", { data, name:email });
              }
            }
          );
      }
    }
  })

}


