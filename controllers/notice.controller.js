const {NoticeService} = require('../services');
const {Response } = require('../share')

const getAllNotice = async (_, res) => {
    try {
        const notices = await NoticeService.selectAll();
        const response = new Response(200, 'OK', notices);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const updateNotice = async (req, res) => {
    try {
        const id = req.body.id;
        const notices = await NoticeService.updateReadNotice(id);
        const response = new Response(200, 'OK', notices);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

module.exports = {
    getAllNotice,
    updateNotice
}