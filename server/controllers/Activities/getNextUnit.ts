import unitModel from "../../models/unit";
import courseModel from "../../models/course";
import themeModel from "../../models/theme";
import lessonModel from "../../models/lesson";
import CompletedThemes from "../../models/CompletedThemes";

async function getNextUnit(req: any, res: any) {
  const { id } = req.params;
  try {
    const unit = await unitModel.findById(id);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const course = await courseModel.findById(unit.course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // If there is no next unit into the course
    if (course.unit_count === unit.index) {
      const themesScore = await CompletedThemes.find({
        user: req.user._id,
        course: course._id,
        score: { $ne: null },
      }).select("score");
      if (themesScore.length === 0) return res.status(200).json({ course });
      const total = themesScore.reduce((a: any, b: any) => a + b.score, 0);

      const average = Math.round(total / themesScore.length);
      return res.status(200).json({ course, total: average });
    }

    const nextUnit = await unitModel
      .findOne({
        course: course._id,
        index: unit.index + 1,
      })
      .select("_id");

    if (!nextUnit) {
      return res.status(404).json({ message: "Next unit not found" });
    }

    const nextLesson = await lessonModel
      .findOne({
        unit: nextUnit._id,
        index: 1,
      })
      .select("_id");

    if (!nextLesson) {
      return res.status(404).json({ message: "Next lesson not found" });
    }

    const nextTheme = await themeModel.findOne({
      lesson: nextLesson._id,
      index: 1,
    });

    if (!nextTheme) {
      return res.status(404).json({ message: "Next theme not found" });
    }

    return res.status(200).json({ theme: nextTheme._id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getNextUnit;
