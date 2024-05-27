import UnitModel from "../../../models/unit";
import { getUnitPath } from "../../../models/getModelPath";

async function getUnits(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });
    const units = await UnitModel.find({ course: id });
    const path = await getUnitPath(id);
    res.status(200).json({ data: units, path });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export default getUnits;
