import keys from "../../config/keys.js";
import jwt from "jsonwebtoken";

export default function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "user unauthorized" });
      }
      const arrOfRoles = jwt.verify(token, keys.jwt);
      let userRoles = arrOfRoles.role.role;
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
          
        } 
        if (!hasRole){
          return res
            .status(403)
            .json({ success: false, message: "no permission" });
        }
      });

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "user unauthorized" });
    }
  };
}
