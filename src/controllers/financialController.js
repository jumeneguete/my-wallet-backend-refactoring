
import jwt from "jsonwebtoken";
import * as financialService from "../services/financialService.js"

export async function addRegister (req, res) {
    try {
      const authorization = req.headers.authorization || "";
      const token = authorization.split('Bearer ')[1];
  
      const { value, type } = req.body;
  
      if (!token) {
        return res.sendStatus(401);
      }
  
      let user;
  
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        return res.sendStatus(401);
      }

     const data = await financialService.validateData(user, value, type);
     if(!data) return res.sendStatus(400);
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };