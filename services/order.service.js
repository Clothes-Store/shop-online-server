const db = require("../database");

const selectAll = async (limit) => {
    try {
      let orders;
      if (limit > 0) {
        orders = await db.execute(`SELECT * FROM orders LIMIT ?`, [limit]);
      } else {
        orders = await db.execute(`SELECT * FROM orders`);
      }
      const order_ids = orders.map(i => i.id);
    let ids_st = "(";
    order_ids.map((i) => {
      ids_st += `${i}, `;
    });
    ids_st = ids_st.substr(0, ids_st.length - 2) + ")";
    const list = await db.execute(`SELECT order_id, number, price_each, p.name as name FROM order_details JOIN products p on order_details.product_id = p.id WHERE order_id IN ${ids_st}`)
    const result = orders.map(i => {
      const rs = {};
      const id = i.id;
      rs.date = i.order_date;
      rs.payment_method = i.payment_method;
      rs.order_list = list.filter(i => i.order_id == id);
      return rs;
    })
    return result;
    } catch (error) {
      console.log(error);
    }
  };

const selectById = async (id) => {
  try {
    const orders = await db.execute(`SELECT * FROM orders where user_id = ?`, [
      id,
    ]);
    const order_ids = orders.map(i => i.id);
    let ids_st = "(";
    order_ids.map((i) => {
      ids_st += `${i}, `;
    });
    ids_st = ids_st.substr(0, ids_st.length - 2) + ")";
    const list = await db.execute(`SELECT order_id, number, price_each, p.name as name FROM order_details JOIN products p on order_details.product_id = p.id WHERE order_id IN ${ids_st}`)
    const result = orders.map(i => {
      const rs = {};
      const id = i.id;
      rs.date = i.order_date;
      rs.payment_method = i.payment_method;
      rs.order_list = list.filter(i => i.order_id == id);
      return rs;
    })
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (user_id, lists, payment_method = 0) => {
    try {
        const order = await db.execute(`INSERT INTO orders (user_id, payment_method) VALUES (?, ?)`, [
            user_id, payment_method
        ]);
        const order_id = order[2];
        const promises = [];
        for(let i = 0; i < lists.length; i++){
          item = lists[i];
          promises.push(
            db.execute(`INSERT INTO order_details (order_id, product_id, number, price_each) VALUES (?, ?, ?, ?)`, [
              order_id,  item.id, item.amount, item.price_each
          ])
          )
        }
        await Promise.all(promises);
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