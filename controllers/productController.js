const Products = require('../models/Products');

exports.getAllProducts =  async (req, res) => {
   try {
    const products = await Products.find({});
    res.status(200).json({ products }); 
   } catch(error) {
    res.status(500).json({ msg: error });
   }
};

exports.getProduct = async (req, res) => {

  try {
    const product = await Products.findOne({ _id: req.params.id });

    if (!product) {
        return res.status(404).json({ msg: `No product find with id: ${req.params.id}` });
    }

    res.status(200).json({ product });

  } catch(error) {
    res.status(500).json({ msg: error });
  }

};

exports.addProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body);
        res.status(201).json({ product });
    } catch(error) {
        res.status(500).json({ msg: error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Products.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        } );
    
        if (!product) {
            return res.status(404).json({ msg: `No product find with id: ${req.params.id}` });
        }

        res.status(200).json({ product });
    
    } catch(error) {
        res.status(500).json({ msg: error }); 
    }
};

exports.deleteProduct = async (req, res) => {
   try {
    const product = await Products.findOneAndDelete({ _id: req.params.id });

    if (!product) {
        return res.status(404).json({ msg: `No product find with id: ${req.params.id}` });
    }

    res.status(200).json({ product: null, status: "success" });

   } catch (error) {
    res.status(500).json({ msg: error }); 
   }
};