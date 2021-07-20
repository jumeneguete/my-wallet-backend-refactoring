import connection from "../database.js";

export async function createUser(name, email, hashedPassword){
    const result = await connection.query(
      `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashedPassword]
    );
    return result.rows;
  }
  
  export async function findUser(email){
    const result = await connection.query(
      `SELECT * FROM "users" WHERE "email"=$1`,
      [email]
    );
  
    return result;
  }