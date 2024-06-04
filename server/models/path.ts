import mongoose from "mongoose";

const pathSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, // Could be Unit lesson or theme
    unique: true,
  },
  path: {
    type: String,
    unique: true,
  },
});

export default mongoose.model("Path", pathSchema);

const PathModel = mongoose.model("Path", pathSchema);

export async function getPath(id: string) {
  const path = await PathModel.findOne({ id: id });
  if (path) if (!path.path) throw new Error("Path not found");
  if (path === null) throw new Error("Path not found");

  const pathString: string = path.path as string;
  return JSON.parse(pathString);
}
