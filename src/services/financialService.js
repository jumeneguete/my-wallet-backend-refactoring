import * as financialRepository from "../respositories/financialRepository.js"

export async function validateData(user, value, type){
    if (!value || !type) {
        return null;
      }
  
      if (!['INCOME', 'OUTCOME'].includes(type)) {
        return null;
      }
  
      if (value < 0) {
        return null;
      }
  
      return await financialRepository.create(user, value, type);
};

export async function allEvents(user){
  return await financialRepository.getAllEvents(user);
};

export async function sum (user){
  const events = await allEvents(user);
  
  const sum = events.rows.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
  return sum;
};