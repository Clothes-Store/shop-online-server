const db = require("../database");

const selectAll = async (limit) => {
    try {
      let rs;
      if (limit > 0) {
        rs = await db.execute(`SELECT * FROM orders LIMIT ?`, [limit]);
      } else {
        rs = await db.execute(`SELECT * FROM orders`);
      }
      return rs;
    } catch (error) {
      console.log(error);
    }
  };

const selectById = async (id) => {
  try {
    const orders = await db.execute(`SELECT * FROM orders where id = ?`, [
      id,
    ]);
    return orders;
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (user_id, product_id, number, price_each, payment_method = 0) => {
    try {
        const order = await db.execute(`INSERT INTO orders (user_id, payment_method) VALUES (?, ?)`, [
            user_id, payment_method
        ]);
        const order_id = order[2];
        await db.execute(`INSERT INTO order_details (order_id, product_id, number, price_each) VALUES (?, ?, ?, ?)`, [
            order_id,  product_id, number, price_each
        ]);
        return order;
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
    selectAll,
    selectById,
    createOrder
}