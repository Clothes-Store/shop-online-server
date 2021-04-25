const db = require('../database');

const selectAll = async () => {
    try {
        const rs = await db.execute(`SELECT * FROM collections`);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const selectById = async (id) => {
    try {
        const rs = await db.execute(`SELECT * FROM collections where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const deleteById = async (id) => {
    try {
        const rs = await db.execute(`DELETE FROM collections where id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const updateById = async (id, newName, banner) => {
    try {
        const rs = await db.execute(`UPDATE collections SET name = ?, banner = ? where id = ?`, [newName, banner, id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const addNew = async(name, banner) => {
    try {
        const rs = await db.execute(`INSERT INTO collections (name, banner) VALUES (?,?)`, [name, banner]);
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