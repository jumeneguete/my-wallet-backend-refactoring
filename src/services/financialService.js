import * as finacialRepository from "../respositories/financialRepository.js"

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
  
      return await finacialRepository.create(user, value, type);
}