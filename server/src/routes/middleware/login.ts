import User from "../../../models/user";
import { body, validationResult } from "express-validator";

const login = [
  body("email")
    .notEmpty()
    .escape()
    .isString()
    .withMessage("email is required")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error("Invalid email or password");
      }
    }),
  body("password").notEmpty(),
  (req: any, res: any, next: any) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  },
];

export default login;
