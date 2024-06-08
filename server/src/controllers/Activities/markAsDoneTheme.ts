import themeModel from "../../../models/theme";
import scoreModel from "../../../models/score";
import lessonModel from "../../../models/lesson";
import { getPath } from "../../../models/path";
import userModel from "../../../models/user";
async function markAsDone(req: any, res: any) {
  const { id } = req.params;

  // Score percentage **if the activity is not a quiz the score will be 100**
  let { percentage } = req.body;
  percentage = Number(percentage); // Make sure that the percentage is a number

  try {
    const theme = await themeModel.findByIdAndUpdate(id, { done: true });
    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }

    //  101 means that the activity is not any type of quiz wich means that is no need to create a score
    if (percentage !== 101) {
      // Check if a score already exists for this theme
      const existingScore = await scoreModel.findOne({
        theme: theme._id,
        user: req.user._id,
      });
      if (existingScore) {
        // Update the existing score
        existingScore.score = Math.round(percentage);
        await existingScore.save();
      } else {
        const Lessonpath = await getPath(theme.lesson.toString());
        // Create a new score
        await scoreModel.create({
          user: req.user._id,
          course: Lessonpath[0].id, // Course id
          unit: Lessonpath[1].id, // unit id
          lesson: theme.lesson,
          theme: theme._id,
          score: Math.round(percentage),
        });
      }
    }

    await userModel.findByIdAndUpdate(req.user._id, { theme: theme._id }); // Keep track of the user's theme

    const lesson = await lessonModel.findById(theme.lesson);
    if (!lesson) throw new Error("Lesson not found");

    let hasNext = false;
    // index starts from 1

    if (lesson.theme_count > theme.index) {
      hasNext = true;
    }

    // If there is no next themes
    if (!hasNext) {
      const lessonScore = await scoreModel
        .find({ lesson: lesson.id, user: req.user._id })
        .select("score");

      if (!lessonScore) throw new Error("Lesson score not found");

      let total = lessonScore.reduce((a: any, b: any) => a + b.score, 0);

      const average = Math.round(total / lessonScore.length);

      return res.status(200).json({ lesson, hasNext, score: average });
    } /// No next theme

    const nextTheme = await themeModel.findOne({
      lesson: theme.lesson,
      index: theme.index + 1,
    });

    if (!nextTheme) throw new Error("Next theme not found");

    return res.status(200).json({ nextTheme, hasNext });
    // Check if there is a next theme
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export default markAsDone;
