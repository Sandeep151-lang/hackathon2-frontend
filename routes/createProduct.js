var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
/* GET home page. */

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "../images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({ storage: Storage })

require('./dbConn.js/conn');


var BuyProduct = new mongoose.Schema({
    Product_name: { type: String, required: true },
    Product_price: { type: String, required: true },
    User_name: { type: String, required: true },
    User_email: { type: String, required: true },
    User_number: { type: String, required: true }
}, { collection: 'product' });

var product = mongoose.model('product', BuyProduct);



var products = new mongoose.Schema({
    Product_Name: { type: String, required: true },
    Product_Price: { type: String, required: true },
    Product_time: { type: Number, required: true },
    Product_image: { type: String }
}, { collection: 'equipments' });

var productDetails = mongoose.model('equipments', products);

router.post('/createProduct', upload.single("image"), function (req, res) {
    var data = new productDetails(req.body);
    data.save();
    console.log(req.file)
    res.send({
        message: "Product Created",
        message: data
    })
});

router.get('/getProduct', function (req, res) {
    productDetails.find().then((doc) => {
        res.send({ item: doc })
    })
});



router.post('/buyProduct', async (req, res) => {
    var buy = new product(req.body);
    buy.save();
    res.status(200).send({
        message: "buy successful",
        message: buy
    })
})


module.exports = router;
