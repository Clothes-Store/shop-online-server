const db = require('../database');

const selectAll = async () => {
    try {
        const rs = await db.execute(`SELECT * FROM notices `);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const addNewNotice = async (content) => {
    try {
        const rs = await db.execute(`INSERT INTO notices (content, is_read) VALUES( ?, 0 )`, [content]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const deleteNotice = async (id) => {
    try {
        const rs = await db.execute(`DELETE FROM notices WHERE id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const updateReadNotice = async (id) => {
    try {
        const rs = await db.execute(`UPDATE notices SET id_read = 1 WHERE id = ?`, [id]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    selectAll,
    updateReadNotice,
    deleteNotice,
    addNewNotice
}