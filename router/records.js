
const express = require("express");
const router = express.Router();
const recordsController = require('../controllers/recordsControllers')



// to get each month report
router.get("/", recordsController.dataLandingPage);

// to get each month report
router.get("/january", recordsController.getJanuary);
router.get("/february", recordsController.getFebruray);
router.get("/march", recordsController.getMarch);
router.get("/april", recordsController.getApril);
router.get("/may", recordsController.getMay);
router.get("/june", recordsController.getJune);
router.get("/july", recordsController.getJuly);
router.get("/august", recordsController.getAugust);
router.get("/september", recordsController.getSeptember);
router.get("/october", recordsController.getOctober);
router.get("/november", recordsController.getNovember);
router.get("/december", recordsController.getDecember);




module.exports = router;