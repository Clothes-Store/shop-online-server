const {CityService} = require('../services');
const {Response } = require('../share')

const getAllCity = async (_, res) => {
    try {
        const cities = await CityService.selectAll();
        const response = new Response(200, 'OK', cities);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, err);
        res.status(500).json(response);
    }
}

module.exports = {
    getAllCity
}