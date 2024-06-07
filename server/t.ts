import mongoose from "mongoose";
import themeModel from "./models/theme";
import course from "./models/course";
import unit from "./models/unit";
import lesson from "./models/lesson";
import activity from "./models/activity";
import "dotenv/config";

// Conect to MongoDB
(async function connect() {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) throw new Error(" cannot get mongodb url from environment");
  try {
    await mongoose.connect(MONGODB_URL);
    await test();
    return;
  } catch (error) {
    console.log(error);
  }
})();

async function test() {
  const courseid = await course.find({ name: "Course 2" }).select("_id");
  const units = await unit.find({ course: courseid }).select("_id");

  units.forEach(async (unit) => {
    const lessons = await lesson.find({ unit: unit._id }).select("_id");
    lessons.forEach(async (lesson) => {
      const themes = await themeModel
        .find({ lesson: lesson._id })
        .select("_id");

      themes.forEach(async (theme) => {
        const activities = await activity.find({ theme: theme._id });

        activities.forEach(async (activity) => {
          if (activity.type === "multioption") {
            console.log(activity);
          }
        });
      });
    });
  });
}
