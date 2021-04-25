const mysql = require("mysql");
const config = require("config");

const dbConfig = config.get("database");

const getConnection = async () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.dbname
    });
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    });
  });

const execQuery = async(conn, q, params) => new Promise(
    (resolve, reject) => {
        const handler = (err, result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        }
        conn.query(q, params, handler);
    }
)

const execute = async(q, params) => {
    let results = null;
    try {
        const conn = await getConnection();
        results = await execQuery(conn, q, params);
        conn.end();
    } catch (error) {
        console.log(error);
    } finally {
        return Object.values(JSON.parse(JSON.stringify(results)));
    }
}

module.exports = {
    getConnection,
    execQuery,
    execute
}