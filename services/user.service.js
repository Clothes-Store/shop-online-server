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

const getStaticMetrics = async () => {
  try {
    const rs = await Promise.all([
      db.execute(`select users.name as name , sum(od.number * od.price_each) as total_order from users join orders o on users.id = o.user_id join order_details od on o.id = od.order_id group by od.order_id`),
      db.execute(`select products.name as product_name, sum(number) as total_sale from products join order_details od on products.id = od.product_id group by od.product_id`),
      db.execute(`select count(*) as total_user from users`)
    ]);
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
  getStaticMetrics
};
