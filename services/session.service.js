const db = require('../database');

const selectToken = async (token) => {
    try {
        const rs = await db.execute(`SELECT * FROM sessions WHERE token = ?`, [token]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const addNewToken = async (token) => {
    try {
        const rs = await db.execute(`INSERT INTO sessions (token) VALUES( ? )`, [token]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

const deleteToken = async (token) => {
    try {
        const rs = await db.execute(`DELETE FROM sessions WHERE token = ?`, [token]);
        return rs;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    selectToken,
    deleteToken,
    addNewToken
}