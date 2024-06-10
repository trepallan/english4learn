import userModel from "../../../models/user";
import themeModel from "../../../models/theme";

async function getNextActivity(req: any, res: any) {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found" })
        .select("theme");

    const theme = await themeModel.findById(user.theme);
    if (!theme) return res.status(404).json({ message: "Theme not found" });

    res.status(200).json({ theme: theme._id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getNextActivity;
