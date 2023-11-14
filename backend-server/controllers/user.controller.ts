import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { hashPassword } from "../hash";
// import { email, object, string } from 'cast.ts'

export class UserController {
  constructor(public userService: UserService) {}

  login = async (req: Request) => {
    let user = req.body;
    console.log("user:", user);

    let result = await this.userService.login(user);

    return {
      status: true,
      message: "Login Success!",
      token: result,
    };
  };

  createUser = async (req: Request, res: Response) => {
    let user = req.body;

    let checkEmail = await this.userService.checkEmailDup(user.email);

    if (checkEmail.length >= 1) {
      return res.status(400).json({
        status: false,
        type: "email",
        message: "Email already exist",
      });
    }

    if (user.password.length < 6) {
      return res.status(400).json({
        status: false,
        type: "password",
        message: "Use 6 character or more for password",
      });
    }

    let hashedPassword = await hashPassword(user.password);

    await this.userService.createUser(user.email, hashedPassword);

    return res.status(200).json({
      status: true,
      message: "Create Account Successfully!",
    });
  };
}
