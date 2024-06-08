import { validationResult, query } from "express-validator";

const getNextMD = [
  query()
    .notEmpty()
    .escape()
    .exists()
    .withMessage(" ID is required")
    .isString()
    .withMessage("ID must be a string"),
  (req: any, res: any, next: any) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    console.log(result.array());
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  },
];

export default getNextMD;
