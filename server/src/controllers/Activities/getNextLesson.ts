import lessonModel from "../../../models/lesson";
import themeModel from "../../../models/theme";
import scoreModel from "../../../models/score";
import unitModel from "../../../models/unit";

async function getNextLesson(req: any, res: any) {
  const { id } = req.params;

  try {
    const lesson = await lessonModel.findById(id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const unit = await unitModel.findById(lesson.unit);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    if (unit.lesson_count < lesson.index) {
      const themesScore = await scoreModel.find({ unit: unit._id });

      let total = 0;

      for (let i = 0; i < themesScore.length; i++) {
        total += themesScore[i].score;
      }

      total = total.toFixed(2) as any;
      return res.status(200).json({ unit, total });
    }

    const nextLesson = await lessonModel
      .find({ index: lesson.index + 1, unit: unit._id })
      .select("_id");

    const theme = await themeModel
      .findOne({ lesson: lesson._id, index: 1 })
      .select("_id");

    if (!theme) return res.status(404).json({ message: "Theme not found" });

    return res.status(200).json({ theme: theme._id.toString() });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default getNextLesson;
