import Users from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

class authController {
  async registration(req, res) {
    try {
      const { email, username, password, repeatPassword } = req.body;
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
      if (password !== repeatPassword) {
        return res.status(400).json({ error: "Wrong password repeated" })
      }
      const user = await Users.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      res.json({ success: true, message: `user with email ${email} was successfully added` });
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "check the input" })
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
      res.json({ success: true, userId: user.id, token: `Bearer ${token}`, role: user.role })

    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "check the input" })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await Users.findAll({ attributes: ['id', 'email', 'role', 'username'] })

      res.json(users);
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "some server error" })
    }
  }
  async getUserOffice(req, res) {
    try {
      const user = await Users.findByPk(req.params.id, { attributes: ['id', 'email', 'username', 'photo', 'role', 'favorite', 'cart'] })
      res.json(user)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  }
  async editUserRole(req, res) {
    try {
      console.log({...req.params})
      await Users.update({role: {role: req.body.role}}, {where:{...req.params}})
      res.json({success: true, message: "role was added"})
    } catch(error) {
      console.log(error)
      res.json(error)
    }
  }
  async deleteUserById(req, res) {
    try {
      await Users.destroy({where: {...req.params}})
      res.json({success: true, message: `user with id ${req.params.id} was deleted successfully`})
    } catch(error) {
      console.log(error)
      res.json(error)
    }
  }
}

export default new authController();
