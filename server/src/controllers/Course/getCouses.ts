import CourseMoel from "../../../models/course"; //TODO: change

async function getCourses(req: any, res: any) {
  try {
    const courses = await CourseMoel.find();
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getCourses;
