
const express = require('express');
const router = express.Router();

const classController = require('../controllers/classController')

router.get("/", classController.getClasses);
router.post("/create-class", classController.createClasses);

module.exports = router;
