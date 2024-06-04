import themeModel from "../../../models/theme";
import scoreModel from "../../../models/score";
import lessonModel from "../../../models/lesson";

async function markAsDone(req: any, res: any) {
  const { id } = req.params;

  // Score percentage **if the activity is not a quiz the score will be 100**
  const { percentage } = req.body;

  try {
    const theme = await themeModel.findById(id);
    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }
    await theme.save();

    await scoreModel.create({
      user: req.user._id,
      lesson: theme.lesson,
      theme: theme._id,
      score: percentage,
      done: 100,
    });

    const lesson = await lessonModel.findById(theme.lesson);
    if (!lesson) throw new Error("Lesson not found");

    let hasNext = false;
    // index starts from 1
    if (lesson.theme_count > theme.index) {
      hasNext = true;
    }

    if (!hasNext) res.status(200).json({ lesson, hasNext }); /// No next theme

    const nextTheme = await themeModel.findOne({
      lesson: theme.lesson,
      index: theme.index + 1,
    });

    if (!nextTheme) throw new Error("Next theme not found");
    res.status(200).json({ nextTheme, hasNext });

    // Check if there is a next theme
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default markAsDone;
