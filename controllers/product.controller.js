const {ProductService} = require('../services');
const {Response } = require('../share')

const getAllProduct = async (_, res) => {
    try {
        const products = await ProductService.selectAll(10);
        const response = new Response(200, 'OK', products);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const createProduct = async (req, res) => {
    try {

        const imgs = [];
        req.files.map(item => {
            imgs.push(item.path);
        });

        const products = {
            name: req.body.name,
            type: req.body.type,
            current_price: req.body.current_price,
            sale: req.body.sale,
            category_id: req.body.category_id,
            collection_id: req.body.collection_id
        } 
        const rs = await ProductService.addNew(products, imgs);
        const response = new Response(200, 'OK', rs);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

module.exports = {
    getAllProduct,
    createProduct
}