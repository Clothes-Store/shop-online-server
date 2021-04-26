const db = require("../database");

const selectAll = async (limit) => {
  try {
    let rs;
    if (limit > 0) {
      rs = await db.execute(`SELECT * FROM users LIMIT ?`, [limit]);
    } else {
      rs = await db.execute(`SELECT * FROM users`);
    }

    return rs;
  } catch (error) {
    console.log(error);
  }
};

const selectById = async (id) => {
  try {
    const rs = await db.execute(`SELECT * FROM users where id = ?`, [id]);
    return rs;
  } catch (error) {
    console.log(error);
  }
};

const selectByPhone = async (phone) => {
  try {
    const rs = await db.execute(`SELECT * FROM users where phone = ?`, [phone]);
    return rs;
  } catch (error) {
    console.log(error);
  }
};

const selectByEmail = async (phone) => {
  try {
    const rs = await db.execute(`SELECT * FROM users where email = ?`, [email]);
    return rs;
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (
  id,
  name,
  province_id,
  city_id,
  address,
  phone,
  img,
  email
) => {
  try {
    const rs = await db.execute(
      `UPDATE users SET name = ?, province_id = ?, city_id = ?, address = ?, phone = ?, img = ?, email = ? where id = ?`,
      [name, province_id, city_id, address, phone, img, email, id]
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};

const addNew = async (user) => {
  try {
    const {
      img,
      phone,
      email,
      name,
      password,
      role,
      province_id,
      city_id,
      address,
    } = user;
    const rs = await db.execute(
      `INSERT INTO users (img, phone, email, name, password, role, province_id, city_id, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [img, phone, email, name, password, role, province_id, city_id, address]
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  selectAll,
  selectById,
  updateById,
  addNew,
  selectByPhone,
  selectByEmail,
};
