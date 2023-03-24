const express = require ('express')
const router = express.Router()
const usersController = require('../controllers/adminActionsController')



// get register page
router.get('/register',usersController.getRegisterPage)

// post new user
router.post('/signup', usersController.registerHandler)

router.get('/user/:id', usersController.getSingleUser)
router.delete('/delete/:id', usersController.deleteUser)
router.get('/user', usersController.getAllUser)


// create for more users



module.exports = router;