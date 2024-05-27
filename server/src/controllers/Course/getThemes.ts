import ThemeModel from "../../../models/theme";
import { getThemePath } from "../../../models/getModelPath";

async function getThemes(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });
    const themes = await ThemeModel.find({ lesson: id });
    const path = await getThemePath(id);

    res.status(200).json({ data: themes, path });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getThemes;
