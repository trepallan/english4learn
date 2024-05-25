import LessonModel from "../../../models/lesson";

async function getLessons(req: any, res: any) {
  try {
    const { id } = req.params;
    const lessons = await LessonModel.find({ unit: id });
    res.status(200).json(lessons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getLessons;
