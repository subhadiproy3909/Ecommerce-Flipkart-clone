const router = require('express').Router();
const Product = require('../database/models/productModel');
const products = require('../constants/product');


router.get('/products', async (req, res) =>{
    try {
        const data = await Product.find({});

        res.json(data);
    } catch (error) {
        console.log(`get product error ${error.message}`);
    }
})

router.get('/productdetails/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        // res.send(id);
        if(id === undefined){
            res.status(404).json({message: "No id provided"});
        }

        const product = await Product.findOne({p_id: id});

        res.status(200).json(product);
    } catch (err) {
        console.log(`get product details error: ${err.message}`);
    }
})

module.exports = router;