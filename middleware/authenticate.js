import jwt from "jsonwebtoken";
import { handleError } from "../Helpers/handleError.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(handleError(401, "Access denied. No token provided."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    return next(handleError(403, "Invalid token."));
  }
};
