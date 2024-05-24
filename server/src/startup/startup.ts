import auth from "./auth/auth";
import authorization from "../routes/authorization";
import courses from "../routes/couse";

export default function startup(app: any) {
  app.use("/authorization", authorization);
  app.use("/courses", courses);
}
