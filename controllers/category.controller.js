const {CategoryService} = require('../services');
const {Response } = require('../share')

const getAllCategory = async (_, res) => {
    try {
        const categories = await CategoryService.selectAll();
        const response = new Response(200, 'OK', categories);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, err);
        res.status(500).json(response);
    }
}

const addNewCategory = async (req, res) => {
    try {
        const name = req.body.name;
        const categories = await CategoryService.addNew(name);
        const response = new Response(200, 'OK', categories);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, err);
        res.status(500).json(response);
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.body.id;
        const newName = req.body.newName;
        const categories = await CategoryService.updateById(id, newName);
        const response = new Response(200, 'OK', categories);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, err);
        res.status(500).json(response);
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.body.id;
        const categories = await CategoryService.deleteById(id);
        const response = new Response(200, 'OK', categories);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, err);
        res.status(500).json(response);
    }
}

module.exports = {
    deleteById,
    addNewCategory,
    getAllCategory,
    updateCategory
}