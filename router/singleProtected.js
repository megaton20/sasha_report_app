const express = require ('express')
const router = express.Router()
const databaseConnection = require("../model/databaseTable");
let db = databaseConnection;



router.get('/', (req, res) =>{
    const email = req.session.user.email
    // check for role
    db.query(`SELECT * FROM user WHERE email = "${email}"  ` , (err, results) => { 
        if (err) {
            
        } else {
            let loggedRole =  results[0].role

            if (loggedRole == "user") {
                return res.render('index', {
                    name: email,
                })
            } else {
                return res.render('adminIndex', {
                    name: email,
                })
            }
        }
    })

})
router.get('/about', (req, res) =>{
    const email = req.session.user.email
    res.render('about', {
        name: email,
    })
})

router.get('/profile', (req, res) =>{
    const email = req.session.user.email
    db.query(`SELECT * FROM user WHERE email = "${email}"  ` , (err, results) => {
        if(err){
            console.log(err)
        }else{
            let user = results[0]
            res.render('profile', {
                name: email,
                user:user
            })
        }
    })
   
})


module.exports = router;