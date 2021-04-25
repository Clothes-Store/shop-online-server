const {ProvinceService} = require('../services');
const {Response } = require('../share')

const getProvincesByCity = async (req, res) => {
    try {
        const city = req.query.city || 1;
        const provinces = await ProvinceService.selectByCityId(city);
        const response = new Response(200, 'OK', provinces);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, err);
        res.status(500).json(response);
    }
}

module.exports = {
    getProvincesByCity
}