
import jwt from "jsonwebtoken";
import * as financialService from "../services/financialService.js"

import * as financialRepository from "../respositories/financialRepository.js"
import connection from "../database.js";

export async function addRegister (req, res) {
  const { value, type } = req.body;

    try {  
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

  export async function getRegisters (req, res) {
    try {
      const user = authentication(req);
      if(!user) return res.sendStatus(401);
  
      const events = await financialService.allEvents(user);
  
      res.send(events.rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  export async function getTotal (req, res) {
    try {
      const user = authentication(req);
      if(!user) return res.sendStatus(401);
  
      const sum = await financialService.sum(user);
  
      res.send({ sum });
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