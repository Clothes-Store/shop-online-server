const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {UserService, SessionService} = require('../services');
const {Response } = require('../share');

const token_parse = config.get('server.token_parse');

const getAllUser = async (_, res) => {
    try {
        const users = await UserService.selectAll(30);
        const response = new Response(200, 'OK', users);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await UserService.selectById(id);
        const user = users[0];

        const resUser = {
            id: user.id,
            img: user.img,
            phone: user.phone,
            email: user.email,
            name: user.name,
            role: user.role,
            province_id: user.province_id,
            city_id: user.city_id,
            address: user.address,
        }

        const response = new Response(200, 'OK', {user: resUser});
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const login = async (req,res) => {
    try {
        const {phone, password} = req.body;
        
        const userExist = await UserService.selectByPhone(phone);
        if(userExist.length === 0){
            const response = new Response(404, 'Phonenumber not found!');
            return res.status(404).json(response);
        }
        const user = userExist[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            const response = new Response(403, 'Password was wrong!');
            return res.status(403).json(response);
        }

        const resUser = {
            id: user.id,
            img: user.img,
            phone: user.phone,
            email: user.email,
            name: user.name,
            role: user.role,
            province_id: user.province_id,
            city_id: user.city_id,
            address: user.address,
        }

        const token = jwt.sign({resUser}, token_parse);
        await SessionService.addNewToken(token);

        const response = new Response(200, 'OK', {user: resUser, token});
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const register = async (req, res) => {
    try {
        const {name, phone} = req.body;
        const userExist = await UserService.selectByPhone(phone);
        if(userExist.length > 0){
            const response = new Response(400, 'Phonenumber is exists!');
            return res.status(400).json(response);
        }
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            img: 'public\\images\\d3790303229ff9cd9631d4645049eebd',
            phone,
            email: null,
            name,
            password,
            role: 0,
            province_id: null,
            city_id: null,
            address: null,
          }
        const user = await UserService.addNew(newUser);
        const response = new Response(200, 'OK', user);
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const imgs = [];
        req.files.map(item => {
            imgs.push(item.path);
        });

        const newUser = {
            img: imgs[0] || 'public\\images\\d3790303229ff9cd9631d4645049eebd',
            phone: req.body.phone || null,
            email: req.body.email || null,
            name: req.body.name || null ,
            role: 0,
            province_id: req.body.province|| null,
            city_id: req.body.city|| null,
            address: req.body.address|| null,
          }
        const user = await UserService.updateById(id, newUser.name, newUser.province_id, newUser.city_id, newUser.address, newUser.phone, newUser.img, newUser.email);
        const response = new Response(200, 'OK', {user: newUser});
        res.status(200).json(response);
    } catch (error) {
        const response = new Response(500, error);
        res.status(500).json(response);
    }
}


module.exports = {
    getAllUser,
    register,
    login,
    getUser,
    update
}
