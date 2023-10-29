const Product = require('./database/models/productModel');
const {products} = require('./constants/product');


const defaultData = async () =>{
    try {
        // await Product.deleteMany();
        const isExists = await Product.find({products});

        if(!isExists){
            await Product.insertMany(products);
            console.log(`data imported successfully`);
        }
        // else{
        //     console.log(`product already saved`);
        // }

    } catch (err) {
        console.log(`defaultData error: ${err.message}`);
    }
}


module.exports = defaultData;