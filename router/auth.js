const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");



router.post('/login', authController.loginHandler)

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});



module.exports = router;
