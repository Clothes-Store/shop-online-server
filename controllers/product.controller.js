const {ProductService} = require('../services');
const {Response } = require('../share')

const getAllProduct = async (_, res) => {
    try {
        let products = await ProductService.selectAll(15);
        const ids = products.map(i => i.id);
        const imgs = await ProductService.getImgs(ids);
        products = products.map(item => {
            item.imgs = imgs.filter(i => i.product_id === item.id);
            return item;
        })
        const response = new Response(200, 'OK', products);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const getProductDetails = async (req, res) => {
    try {
        const pr_id = req.params.id;
        let product = await ProductService.selectById(pr_id);
        const response = new Response(200, 'OK', product);
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
            collection_id: req.body.collection_id,
            description: req.body.description
        } 
        const rs = await ProductService.addNew(products, imgs);
        const response = new Response(200, 'OK', rs);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
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
            collection_id: req.body.collection_id,
            description: req.body.description
        } 
        const rs = await ProductService.updateAll(id,products, imgs);
        const response = new Response(200, 'OK', rs);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id; 
        console.log(req.params)
        const rs = await ProductService.deleteProduct(id);
        const response = new Response(200, 'OK', rs);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

module.exports = {
    getAllProduct,
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct
}