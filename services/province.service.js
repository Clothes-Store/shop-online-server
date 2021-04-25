const db = require('../database');

const selectAll = async () => {
    try {
        const rs = await db.execute(`SELECT * FROM provinces`);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const selectById = async (id) => {
    try {
        const rs = await db.execute(`SELECT * FROM provinces where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const selectByCityId = async (id) => {
    try {
        const rs = await db.execute(`SELECT * FROM provinces where city_id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const deleteById = async (id) => {
    try {
        const rs = await db.execute(`DELETE FROM provinces where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const updateById = async (id, newName) => {
    try {
        const rs = await db.execute(`UPDATE provinces SET name = ? where id = ?`, [newName, id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const addNew = async(name, type = '') => {
    try {
        const rs = await db.execute(`INSERT INTO provinces (name, type) VALUES (?, ?)`, [name, type]);
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
    addNew,
    selectByCityId
}