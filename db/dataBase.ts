import { PoolConnection, createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = createPool({
  port: parseInt(process.env.PORT || "3307"),
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DB,
});

// function connectToDB() {
//   dbConnect.getConnection((err, connection) => {
//     if (err) {
//       console.log(err);
//     }
//     if (connection) {
//       connection.release();
//     }
//     return;
//   });
// }

async function queryDB(query: string, values?: any[]): Promise<any> {
  let connection: PoolConnection | null = null;

  try {
    connection = await dbConnect.getConnection();
    const [results] = await connection.query(query, values);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

export { queryDB };
