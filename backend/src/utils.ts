import crypto from "crypto"
import { Environment } from "./constants";

export const generateRandomString = (digits? : number) : string => {

  if(digits) {
    return crypto.randomUUID().substring(0, digits)
  }

  return crypto.randomUUID();
}

export const getEnvironment = () : Environment => {
  // If NODE_ENV is not defined as environment var, default to dev
  const env = process.env.NODE_ENV || "dev";

  if(env === "staging") return Environment.STAGING;
  if(env === "prod") return Environment.PROD;

  return Environment.DEV;
}

export const getFrontendURL = () : string => {
  const env : Environment = getEnvironment();

  if(env === Environment.STAGING) {
    return process.env.FRONTEND_STAGING_URL || "";
  } else if(env === Environment.PROD) {
    return process.env.FRONTEND_PROD_URL || "";
  }

  return process.env.FRONTEND_DEV_URL || "http://localhost:3000"
}

export const getBackendURL = () : string => {
  const env : Environment = getEnvironment();

  if(env === Environment.STAGING) {
    return process.env.BACKEND_STAGING_URL || ""
  } else if(env === Environment.PROD) {
    return process.env.BACKEND_PROD_URL || "";
  }

  return process.env.BACKEND_DEV_URL || "http://localhost:8000"
}