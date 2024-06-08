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

    // if unit has no more lessons
    if (unit.lesson_count <= lesson.index) {
      // Get score
      const themesScore = await scoreModel.find({
        unit: unit._id,
        user: req.user._id,
      });

      if (themesScore.length === 0) return res.status(200).json({ unit });

      let total = themesScore.reduce((a: any, b: any) => a + b.score, 0);

      const average = Math.round(total / themesScore.length);

      return res.status(200).json({ unit, total: average });
    }

    const nextLesson = await lessonModel
      .findOne({ index: lesson.index + 1, unit: unit._id })
      .select("_id");

    if (!nextLesson)
      return res.status(404).json({ message: "Lesson not found" });

    const theme = await themeModel
      .findOne({ lesson: nextLesson._id, index: 1 })
      .select("_id");

    if (!theme) return res.status(404).json({ message: "Theme not found" });

    return res.status(200).json({ theme: theme._id.toString() });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default getNextLesson;
