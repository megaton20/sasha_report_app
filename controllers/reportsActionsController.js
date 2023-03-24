
const databaseConnection = require("../model/databaseTable");
let db = databaseConnection;
const dayName = require('../model/dayOfWeek')
const monthName = require('../model/month')


let myToday = new Date().toLocaleDateString()
let presentDay = dayName(myToday, '/')
let myMonth = new Date().toLocaleDateString()
let presentMonth = monthName(myMonth, '/')


let sqlSelectFirst = "SELECT * FROM report ORDER BY id DESC LIMIT 6";
let deleteQuery = `DELETE FROM ${presentMonth} WHERE id =?`;


 

exports.deleteReport =  (req, res) => {
    let deleteId = req.params.id
    db.query(deleteQuery, [deleteId], (error, results) => 
    {
      if (error) {
        console.log(error);
      } else {
        req.flash('warning_msg', 'deleted successfully')
        res.redirect('/report/')
      }
    });

  }

  exports.updateReport = (req, res) => {
    let updateId = req.params.id;
    let email = req.session.user.email;
    const { line1, line2, line3, line4, ink, solvent } = req.body;
  
    let line1Input = Number(line1)
    let line2Input = Number(line2)
    let line3Input = Number(line3)
    let line4Input = Number(line4)
    
    

    const totalProduction = line1Input+line2Input+line3Input+line4Input;

    let updateData = {
      line_1:line1Input,
      line_2: line2Input,
      line_3: line3Input,
      line_4: line4Input,
      total: totalProduction,
      ink: ink,
      solvent: solvent,
      total: totalProduction,
      
      // auto generated
      email: email,
      updatedDate: new Date().toLocaleDateString(),
      createdDate: new Date().toLocaleDateString(),
      updatedTime: new Date().toLocaleTimeString(),
      createdTime: new Date().toLocaleTimeString(),
    }; 


          // select user first to know if it is user or admin
          db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
            if (err) {
              console.log(err)
            }else{
              let loggedRole =  results[0].role
              if (loggedRole == "user") {
                db.query(`UPDATE ${presentMonth} SET ? WHERE id = "${updateId}"`, [updateData], (error, results) =>
                {
                  if (error) {
                    console.log(error);
                  }
                }
                );
          
                  // after updating, query and return the remaing verses
                  db.query(`SELECT * FROM ${presentMonth} WHERE id = "${updateId}"`,
                   (err, results) => {
                    if (err) {
                      console.log(err);
                      req.flash('error_msg', 'database error... sorry we could not update item')
                      return res.redirect("/");
                    } else {
                      
                      req.flash('success_msg', 'update completed')
                      res.redirect(`/report/reflection/${updateId}`);
                    }
                  });
              }else {
                  req.flash("error_msg","sorry only authorised users can upadate... ");
                  // req.flash("warning_msg","Contact your admin for more information... ");
                  return res.redirect('/welcome')
              }
            }
          })



  }

  exports.createReport = (req, res) => {
    // TODO : LOCATION FORM USER DATA
    const email = req.session.user.email;


      // select user first to know if it is user or admin
      db.query(`SELECT * FROM user WHERE email = "${email}"`, (err, results) => {
        if (err) {
          console.log(err)
        }else{
          let loggedRole =  results[0].role
          if (loggedRole == "user") {
            db.query(`SELECT * FROM user WHERE email = "${email}"` , (err, results) => {
              if (err) {
                console.log(err)
                req.flash("warning_msg", "Error from database while trying to create record")
                res. redirect('/')
              } else {
                firstName = results[0].first_name
                lastName = results[0].last_name
                 // concatenating full name
                 let loggerName = firstName + lastName
                const uuid = require('uuid').v4()
                const { line1, line2, line3, line4, ink, solvent } = req.body;
              // converting all input to number
                let line1Input = Number(line1)
                let line2Input = Number(line2)
                let line3Input = Number(line3)
                let line4Input = Number(line4)

                
                // total of all available lines
                const totalProduction = line1Input+line2Input+line3Input+line4Input;
            
                let createdDate = new Date().toLocaleDateString();
                let createdTime = new Date().toLocaleTimeString();
                let updatedDate = new Date().toLocaleDateString();
                let updatedTime = new Date().toLocaleTimeString();
              
          if (!(line1 && line2 && line3 && line4 && solvent && ink)) {
            return res.render('createPost', {
              name:email,
              error_msg: `${loggerName} Please enter all inputs`,
              warning_msg: "enter zero for nil inputs"
            })
          } 
          else if(line1 <0  || line2 <0  || line3 <0 || line4 <0 || solvent <0 || ink <0 ){
            return res.render('createPost', {
              name:email,
              error_msg: `${loggerName} Please enter positve numbers only`,
              warning_msg: "enter zero for nil inputs"
            })
          }else {  
            db.query(
              `INSERT INTO ${presentMonth} SET ?`,
              {
                id:uuid,
                full_name:loggerName,
                line_1: line1,
                line_2: line2,
                line_3: line3,
                line_4: line4,
                total:totalProduction,
                ink: ink,
                day:presentDay,
                month:presentMonth,
                solvent: solvent,
                email:email,
                createdDate: createdDate,
                createdTime: createdTime,
                updatedDate: updatedDate,
                updatedTime: updatedTime,
              },
              (err, results) => {
                if (err) {
      
                  console.log(err)
                  req.flash('error_msg', `an error occured from database, try creating again! ${loggerName}`)
                  res.redirect("/");
                } else {
                  req.flash('success_msg', 'report created successfully')
                  res.redirect("/report");
                }
              }
            );
          }
        }})
          }else{
            req.flash("warning_msg" , `${loggerName} you cannot create report in current status!`)
            res.redirect('/')
          }
        }
      })
}



