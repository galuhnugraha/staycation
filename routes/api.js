const router = require('express').Router();
const {upload} = require('../middlewares/multer');
const apiController = require('../controllers/apiController');

//router dashboard
router.get('/landing-page',apiController.landingPage, 
res.header("Access-Control-Allow-Origin","*"),
res.header("Access-Control-Allow-Credentials",true));
router.get('/detail-page/:id',apiController.detailPage);
router.post('/booking-page',upload,apiController.bookingPage);

module.exports = router;

