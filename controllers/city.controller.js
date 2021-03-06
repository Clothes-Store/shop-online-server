const {CityService} = require('../services');
const {Response } = require('../share')

const getAllCity = async (_, res) => {
    try {
        const rs = await CityService.selectAll();
        const response = new Response(200, 'OK', rs);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

module.exports = {
    getAllCity
}