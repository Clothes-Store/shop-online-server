const db = require('../database');

const selectAll = async () => {
    try {
        const rs = await db.execute(`SELECT * FROM categories`);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const selectById = async (id) => {
    try {
        const rs = await db.execute(`SELECT * FROM categories where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const deleteById = async (id) => {
    try {
        const rs = await db.execute(`DELETE FROM categories where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const updateById = async (id, newName) => {
    try {
        const rs = await db.execute(`UPDATE categories SET name = ? where id = ?`, [newName, id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const addNew = async(name) => {
    try {
        const rs = await db.execute(`INSERT INTO categories (name) VALUES (?)`, [name]);
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