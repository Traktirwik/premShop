import keys from "../../config/keys.js";
import jwt from "jsonwebtoken";

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "user unauthorized" });
    }
    const decodedToken = jwt.verify(token, keys.jwt);
    req.user = decodedToken;
    next()
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "user unauthorized" });
  }
}
