const Products = require('../../mongo/models/products');

const createProduct = async(req,res) =>{
   try {
       const { title, desc, price, images, userID } = req.body;
       const product = await Products.create({
           title,
           desc,
           price,
           images,
           'userID' : userID
       });
       res.send({ status: "OK", data: product });
   } catch (e) {
       console.log('createProduct error',e);
       res.status(500).send({status:'ERROR', data: e.message });
       
   }

};




const deleteProduct = (req,res) =>{};




const getProducts = async (req,res) =>{
    try {
        // Uso populate por que hay un objeto ObjectedId
        const products = await Products.find({
            price: { $lt: 60}
        }).populate(
            'userID',
            'username email data role'
            ).select('title desc price')
        res.send({ status: "OK", data: products })

    } catch (e) {
        console.log('getProduct error',e);
        res.status(500).send({ status:'ERROR', data: e.message });
        
    }

};






const getProductsByUser = async (req,res) => {
    try {
        // Uso populate por que hay un objeto ObjectedId
        const products = await Products.find({
            userID: req.params.userid
        });
        res.send({ status: "OK", data: products })

    } catch (e) {
        console.log('getProduct error', e);
        res.status(500).send({ status: 'ERROR', data: e.message });

    }
};

module.exports = {

    createProduct,
    deleteProduct, 
    getProducts, 
    getProductsByUser};