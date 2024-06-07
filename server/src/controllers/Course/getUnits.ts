import UnitModel from "../../../models/unit";
import { getPath } from "../../../models/path";

async function getUnits(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });
    const units = await UnitModel.find({ course: id }).sort({ index: 1 });

    res.status(200).json({ data: units, path: await getPath(id) });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export default getUnits;
