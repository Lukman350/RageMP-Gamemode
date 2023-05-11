const mysql = require("mysql2/promise");

const Database = {
  connect: async () => {
    return await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "ragemp_db",
    });
  },
};

module.exports = Database;
