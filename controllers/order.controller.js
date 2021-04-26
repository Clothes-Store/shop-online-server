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

const getOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const orders = await OrderService.selectById(id);
        const response = new Response(200, 'OK', orders);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const createOrder = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const orderList = req.body.orderList;
        const orders = await OrderService.createOrder(user_id, orderList);
        const response = new Response(200, 'OK', orders);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

module.exports = {
    getAllOrder,
    createOrder,
    getOrder
}