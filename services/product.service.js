const db = require("../database");

const selectAll = async (limit) => {
  try {
    let rs;
    if (limit > 0) {
      rs = await db.execute(`SELECT *, p.id as id, c.name as category_name FROM products p join categories c on c.id = p.category_id LIMIT ?`, [limit]);
    } else {
      rs = await db.execute(`SELECT * FROM products`);
    }
    return rs;
  } catch (error) {
    console.log(error);
  }
};

const selectById = async (id) => {
  try {
    const product = await db.execute(`SELECT * FROM products where id = ?`, [
      id,
    ]);
    const imgs = await db.execute(
      `SELECT * FROM product_imgs where product_id = ?`,
      [id]
    );
    product[0].imgs = imgs.map(i => i.img)
    return product[0];
  } catch (error) {
    console.log(error);
  }
};

const selectByType = async (type) => {
  try {
    const products = await db.execute(`SELECT * FROM products where type = ?`, [
      type,
    ]);
    return products;
  } catch (error) {
    console.log(error);
  }
};

const selectByCategory = async (cate) => {
  try {
    const products = await db.execute(
      `SELECT * FROM products where category_id = ?`,
      [cate]
    );
    return products;
  } catch (error) {
    console.log(error);
  }
};

const selectByCollection = async (colle) => {
  try {
    const products = await db.execute(
      `SELECT * FROM products where collection_id = ?`,
      [colle]
    );
    return products;
  } catch (error) {
    console.log(error);
  }
};

const getImgs = async (ids) => {
  try {
    let ids_st = "(";
    ids.map((i) => {
      ids_st += `${i}, `;
    });
    ids_st = ids_st.substr(0, ids_st.length - 2) + ")";
    const query = `SELECT * FROM product_imgs where product_id IN ${ids_st}`;
    const imgs = await db.execute(query);
    return imgs;
  } catch (error) {
    console.log(error);
  }
};

const addNew = async (product, imgs) => {
  try {
    const {
      name,
      type,
      current_price,
      sale,
      category_id,
      collection_id,
      description
    } = product;
    const products = await db.execute(
      `INSERT INTO products (name, type, current_price, sale, category_id, collection_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, type, current_price, sale, category_id, collection_id, description]
    );
    const product_id = products[2];
    const promises = [];
    for (let i = 0; i < imgs.length; i++) {
      promises.push(
        db.execute(`INSERT INTO product_imgs (product_id, img) VALUES (?, ?)`, [
          product_id,
          imgs[i],
        ])
      );
    }
    await Promise.all(promises);
    return products;
  } catch (error) {
    console.log(error);
  }
};

const updateField = async (id, name, value) => {
  try {
    const products = await db.execute(
      `UPDATE products SET ${name} = ? WHERE id = ?`,
      [value, id]
    );
    return products;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getImgs,
  selectById,
  selectAll,
  selectByType,
  selectByCategory,
  selectByCollection,
  addNew,
  updateField,
};
