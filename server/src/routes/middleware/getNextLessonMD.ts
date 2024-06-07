import { validationResult, query } from "express-validator";

const getNextLessonMD = [
  query().notEmpty().escape().isString().withMessage("lessonId is required"),
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

export default getNextLessonMD;
