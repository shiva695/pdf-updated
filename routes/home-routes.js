const express = require('express');
const {homeview, generatePdf, genServerPdf}  = require('../controllers/homeController');


const router = express.Router();

router.get('/', homeview);
router.get('/download', generatePdf,);

// router.post('/login',(req, res) => {
//     console.log(req.body);
//     var user_name = req.body.user;
//     var password = req.body.password;
//     console.log("User name = "+user_name+", password is "+password);
//     res.end("yes");
//     });
    


module.exports = {
    routes: router
}
