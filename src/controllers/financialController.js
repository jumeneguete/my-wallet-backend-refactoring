
import jwt from "jsonwebtoken";
import * as financialService from "../services/financialService.js"

export async function addRegister (req, res) {

  const { value, type } = req.body;
    try {
      const authorization = req.headers.authorization || "";
      const token = authorization.split('Bearer ')[1];
  
      const { value, type } = req.body;

      const user = authentication(req);
      if(!user) return res.sendStatus(401);
      
     const data = await financialService.validateData(user, value, type);
     if(!data) return res.sendStatus(400);
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  function authentication(req){
      const authorization = req.headers.authorization || "";
      const token = authorization.split('Bearer ')[1];

      if (!token) return null;
  
      try {
        return jwt.verify(token, process.env.JWT_SECRET); //user

      } catch {
        return null;
      }
  }