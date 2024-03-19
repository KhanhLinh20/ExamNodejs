var express = require('express');
const laptopModel = require('../model/laptopModel');
var router = express.Router();

const multer = require('multer');
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    }, 
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});
const upload = multer({storage: store});

/* GET home page. */
router.get('/', async function(req, res, next) {
    let laptop = await laptopModel.find();
    res.render('laptop/index', { laptops: laptop });
});

/* GET create page */
router.get('/create', async function(req, res, next) {
    res.render('laptop/create');
});

/* POST create page */
router.post('/createPost', upload.single('image'), async function(req, res, next) {
    let file = req.file;
    let laptopCreate = new laptopModel({
        name: req.body.name,
        techSpecs: req.body.techSpecs,
        price: req.body.price,
        photo: file.filename
    });
    await laptopCreate.save();
    res.redirect('/laptop');
});

/* check price */
router.get('/searchPrice', async(req, res) => {
    const searchMinPrice = parseFloat(req.query.minPrice) || 0;
    const searchMaxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    const laptopsSeacrchPrice = await laptopModel.find({ price: { $gte: searchMinPrice, $lte: searchMaxPrice } });
    if (!laptopsSeacrchPrice || laptopsSeacrchPrice.length === 0) {
        res.render('laptop/index', { messageSearch: "Search Not Found" });
    } else {
        res.render('laptop/index', {laptops: laptopsSeacrchPrice});
    }
})


module.exports = router;


