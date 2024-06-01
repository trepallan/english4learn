import activityModel from "../../../models/activity";

async function getActivities(req: any, res: any) {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "Something went wrong" });
    const activities = await activityModel.find({ theme: id });
    res.status(200).json({ data: activities });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export default getActivities;
