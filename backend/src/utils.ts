import crypto from "crypto"

export const generateRandomString = (digits? : number) : string => {

  if(digits) {
    return crypto.randomUUID().substring(0, digits)
  }

  return crypto.randomUUID();
}
