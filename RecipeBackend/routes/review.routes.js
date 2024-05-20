const reviews = require('../controllers/review.controller');
const express = require('express');
const router = express.Router();


router.post("/createReview", createReview);

router.get('/getReview', getReview)

router.patch("/editReview/:id", editReview);

router.delete("/deleteReview/:id", deleteReview);



module.exports = router;