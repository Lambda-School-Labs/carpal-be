const db = require("../database/db-config");

const teardown = async () =>{
  await db.destroy()
}

module.exports = teardown