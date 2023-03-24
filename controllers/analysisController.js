
const databaseConnection = require("../model/databaseTable");
let db = databaseConnection;
let sqlSelectFirst = "SELECT * FROM notifications ORDER BY sn";




exports.getPage = (req, res) => {

    let email = req.session.user.email
    db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
      if (err) {
        console.log(err)
        req.flash("error_msg", "databae error while getting notification")
        return res.redirect('/')
      } else {
        let loggedRole =  results[0].role
        // check role, if role is user or admin to have seperate function
        if (loggedRole == "admin") {
          res.render("analysisHome", {
            name:email
          })
        }else {
          req.flash("warning_msg","Stop poking your nose")
          res.redirect('/welcome')
        }
        
      }
    })
 
  }



exports.getReadmorePage = (req, res) => {
  let reflectionID = req.params.id;
  let email = req.session.user.email

  db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
    if (err) {
      console.log()
      req.flash("error_msg","error from db while trying to read notification")
      return res.rediriect('/welcome')
    } else {
      let loggedRole =  results[0].role
      if (loggedRole == "user") {
          // Db query
          db.query(
            `SELECT * FROM notifications WHERE id = "${reflectionID}"`,
            (err, results) => {
              if (err) {
                console.log(err);
              } else {
                let resultsAsString = JSON.stringify(results);
                let data = JSON.parse(resultsAsString);
               return res.render("notificationReflections", { data, name:email });
              }
            }
          );
      } else {
        req.flash("warning_msg","admin wants to read notification")
        return res.rediriect('/welcome')
      }
      
    }
  })

}