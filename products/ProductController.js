
const Product=require('../products/ProductSchema')
// add product

exports.addProduct=async(req,res)=>{
     const {productName,   brandName, category,   price}=req.body
      console.log(req.body);

    try {
 
         const product=new Product({
            productName,
            brandName,
            category,
            price
         })
         await product.save();
         console.log(product);
         res.status(201).json(product);
    } catch (error) {
      res.status(400).json({error:error.message});
    }
}
// get product
  exports.getProducts=async(req,res)=>{
      try {
        const products= await Product.find()
        console.log(products);
        res.json(products)
      } catch (error) {
        res.status(400).json({error:error.message});
      }
  }
