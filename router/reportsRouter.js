const express = require("express");
const router = express.Router();
const reportsActionController = require('../controllers/reportsActionsController')
const reportsController = require('../controllers/reportsController')
// const stats = require('../controllers/statusController')
// let status = stats.statusChecker

// const expenditureCheck = require('../controllers/expenditureCheck')


router.get("/", reportsController.getReport);
// view a post as read more
router.get("/reflection/:id", reportsController.getReadmorePage);
//  create a post page
router.get("/createReport", reportsController.getCreateReportPage );

// create post post request
router.post("/createReport", reportsActionController.createReport);

// update post
router.get("/edit/:id", reportsController.getEditPage);

router.put("/update/:id", reportsActionController.updateReport );
// delete post
router.delete("/delete/:id", reportsActionController.deleteReport);




// router.get('/Consumables', expenditureCheck.getConsumables)
// add new intake
// router.post('/intake',expenditureCheck.createSolventIntake )

// solvent daily usage
// router.post('/solvent',expenditureCheck.inputSolventUsage )

// ink daily usage
// router.post('/ink',expenditureCheck.inputInkUsage )

module.exports = router;
