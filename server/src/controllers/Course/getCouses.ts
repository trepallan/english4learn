import Unit from "../../../models/unit"; //TODO: change

async function getCourses(req: any, res: any) {
  try {
    const units = await Unit.find();
    res.status(200).json(units);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getCourses;
