import LessonModel from "../../../models/lesson";
import { getPath } from "../../../models/path";

async function getLessons(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });
    const lessons = await LessonModel.find({ unit: id });

    res.status(200).json({ data: lessons, path: await getPath(id) });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getLessons;
