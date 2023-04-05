import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function generateToken(user) {
  const payloadOptions = {
    issuer: "express-rest-jwt-demo",
    subject: "send and receive access token",
    expiresIn: "15m", // 15 minutes
  };

  const payload = user;

  const token = jwt.sign(payload, process.env.JWT_SECRET, payloadOptions);

  return token;
}

function verifytToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    let verfError = new Error(); //custom verification error

    if (err.name == "JsonWebTokenError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token verification failed";
    }

    if (err.name == "TokenExpiredError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token expired";
    }

    throw verfError;
  }
}

export default { generateToken, verifytToken };
