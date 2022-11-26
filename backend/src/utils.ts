export const generateRandomString = (digits : number) : string => {
  return (Math.random() + 1).toString(digits);
}
