import UnitModel from "../../../models/unit";

async function getUnits(req: any, res: any) {
  try {
    const { id } = req.params;
    const units = await UnitModel.find({ course: id });
    res.status(200).json(units);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getUnits;
