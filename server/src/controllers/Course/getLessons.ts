import LessonModel from "../../../models/lesson";
import { getLessonPath } from "../../../models/getModelPath";

async function getLessons(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });
    const lessons = await LessonModel.find({ unit: id });
    const path = await getLessonPath(id);

    res.status(200).json({ data: lessons, path });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getLessons;
