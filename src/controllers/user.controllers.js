const catchError = require('../utils/catchError');
const { user } = require('../models');
const bcrypt = require('bcrypt')

const getAll = catchError(async(req, res) => {
    const results = await user.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {first_name, last_name, email, password, birthday} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await user.create({
        first_name, last_name, email, password:hashedPassword, birthday
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await user.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await user.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await user.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}