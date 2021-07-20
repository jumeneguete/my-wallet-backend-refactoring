import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../respositories/userRepository.js"

export async function signUp(name, email, password){
    const result = await userRepository.findUser(email);
  
    if (result.rows[0]) return null;
  
    const hashedPassword = bcrypt.hashSync(password, 12);
  
    return await userRepository.createUser(name, email, hashedPassword);
  }

  export async function authetication(email, password){
  
    const user = await userRepository.findUser(email);
  
    if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
      return null;
    }
  
    const token = jwt.sign({
      id: user.rows[0].id
    }, process.env.JWT_SECRET);
  
    return token;
  }