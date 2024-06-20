import CourseMoel from "../../models/course"; //TODO: change

async function getCourses(req: any, res: any) {
  try {
    const courses = await CourseMoel.find().sort({ index: 1 });
    res.status(200).json({ data: courses, path: [] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getCourses;
