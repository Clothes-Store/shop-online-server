const {OrderService} = require('../services');
const {Response } = require('../share')

const getAllOrder = async (_, res) => {
    try {
        const orders = await OrderService.selectAll(30);
        const response = new Response(200, 'OK', orders);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const createOrder = async (req, res) => {
    try {
        const user_id = 1;
        const {
            product_id, number, price_each
        } = req.body;
        const orders = await OrderService.createOrder(user_id, product_id, number, price_each);
        const response = new Response(200, 'OK', orders);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

module.exports = {
    getAllOrder,
    createOrder
}