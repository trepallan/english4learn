import CourseModel from "../../models/course";
import unitModel from "../../models/unit";
import lessonModel from "../../models/lesson";
import themeModel from "../../models/theme";

async function getNextCourse(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });
    const course = await CourseModel.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Last course
    if (course.name === "Course 4") return res.status(200).json({});

    const nextCourse = await CourseModel.findOne({ index: course.index + 1 });
    if (!nextCourse)
      return res.status(404).json({ message: "Course not found" });

    const nextUnit = await unitModel.findOne({
      index: 1,
      course: nextCourse._id,
    });
    if (!nextUnit) return res.status(404).json({ message: "Unit not found" });

    const nextLesson = await lessonModel.findOne({
      index: 1,
      unit: nextUnit._id,
    });
    if (!nextLesson)
      return res.status(404).json({ message: "Lesson not found" });

    const nextTheme = await themeModel.findOne({
      index: 1,
      lesson: nextLesson._id,
    });
    if (!nextTheme) return res.status(404).json({ message: "Theme not found" });

    res.status(200).json({ theme: nextTheme._id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getNextCourse;
