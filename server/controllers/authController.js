import Users from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

class authController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await Users.findOne({ where: { email: email } });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} has already exist` });
      }
      const hashedPassword = bcrypt.hashSync(password, 7);
      if (password.length < 7) {
        return res
          .status(400)
          .json({ message: "password should be 7 symbols or more" });
      }
      const user = await Users.create({
        email: email,
        password: hashedPassword,
      });
      res.json({ message: `user with email ${email} was successfully added` });
    } catch (error) {
      console.log(error)
      res.status(400).json({success: false, error: "check the input"})
    }
  }

  async signIn(req, res) {
    
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res
          .status(400)
          .json({
            success: false,
            error: `user with email ${email} is not exist`,
          });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ success: false, error: "invalid password" });
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
          role: user.role
        },
        config.jwt,
        { expiresIn: 60 * 60 }
      );
      res.json({success: true, token: token})
      
    } catch (error) {
      console.log(error)
      res.status(400).json({success: false, error: "check the input"})
    }
  }

  async getUsers(req, res) {
    try {
      const users = await Users.findAll({attributes: ['id', 'email', 'role']})
      res.json(users);
    } catch (error) {
      console.log(error)
      res.status(400).json({success: false, error: "some server error"})
    }
  }
}

export default new authController();
