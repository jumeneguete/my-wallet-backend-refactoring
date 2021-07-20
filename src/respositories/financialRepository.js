
import connection from "../database.js";

export async function create(user, value, type) {
    const result = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3) RETURNING *`,
        [user.id, value, type]
    );
    return result.rows[0];
}