import { body, validationResult, query } from "express-validator";

const markAsRead = [
  body("percentage")
    .notEmpty()
    .escape()
    .isNumeric()
    .withMessage("percentage is required")
    .custom((value) => {
      if (value < 0 || value > 101) {
        throw new Error("percentage must be between 0 and 100");
      }
      return true;
    }),
  query().notEmpty().escape().isString().withMessage("themeId is required"),

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

export default markAsRead;
