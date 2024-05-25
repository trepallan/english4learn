import ThemeModel from "../../../models/theme";

async function getThemes(req: any, res: any) {
  try {
    const { id } = req.params;
    const themes = await ThemeModel.find({ lesson: id });
    res.status(200).json(themes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getThemes;
