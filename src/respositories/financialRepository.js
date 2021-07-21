
import connection from "../database.js";

export async function create(user, value, type) {
    const result = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3) RETURNING *`,
        [user.id, value, type]
    );
    return result.rows[0];
}

export async function getAllEvents (user){
   return await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [user.id]
      );
}