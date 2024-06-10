import activityModel from "../../../models/activity";
import themeModel from "../../../models/theme";
import userModel from "../../../models/user";

async function getActivities(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });

    const theme = await themeModel.findById(id);
    if (!theme) return res.status(404).json({ message: "Theme not found" });
    const activities = await activityModel
      .find({ theme: id })
      .sort({ index: 1 });
    if (!activities)
      return res.status(404).json({ message: "Activities not found" });

    // Set user theme
    await userModel.findByIdAndUpdate(req.user._id, { theme: theme._id });

    res.status(200).json({ activities, theme });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export default getActivities;
