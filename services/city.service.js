const db = require('../database');

const selectAll = async () => {
    try {
        const cities = await db.execute(`SELECT * FROM cities`);
        const provinces = await db.execute(`SELECT * FROM provinces`);
        return {cities, provinces};
    } catch (error) {
        console.log(error);
    }
}

const selectById = async (id) => {
    try {
        const rs = await db.execute(`SELECT * FROM cities where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const deleteById = async (id) => {
    try {
        const rs = await db.execute(`DELETE FROM cities where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const updateById = async (id, newName) => {
    try {
        const rs = await db.execute(`UPDATE cities SET name = ? where id = ?`, [newName, id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const addNew = async(name) => {
    try {
        const rs = await db.execute(`INSERT INTO cities (name, type) VALUES (?, 'city')`, [name]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    selectAll,
    selectById,
    deleteById,
    updateById,
    addNew
}