const {CollectionService} = require('../services');
const {Response } = require('../share')

const getAllCollection = async (_, res) => {
    try {
        const collections = await CollectionService.selectAll();
        const response = new Response(200, 'OK', collections);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const addNewCollection = async (req, res) => {
    try {
        const imgs = [];
        req.files.map(item => {
            imgs.push(item.path);
        });

        const name = req.body.name;
        const banner = imgs[0];
        const collections = await CollectionService.addNew(name, banner);
        const response = new Response(200, 'OK', collections);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const updateCollection = async (req, res) => {
    try {
        const imgs = [];
        req.files.map(item => {
            imgs.push(`/${item.path.split('/').slice(1).join('/')}`);
        });

        const id = req.body.id;
        const newName = req.body.newName;
        const newBanner = imgs[0];
        const collections = await CollectionService.updateById(id, newName, newBanner);
        const response = new Response(200, 'OK', collections);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.body.id;
        const collections = await CollectionService.deleteById(id);
        const response = new Response(200, 'OK', collections);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

module.exports = {
    deleteById,
    addNewCollection,
    getAllCollection,
    updateCollection
}