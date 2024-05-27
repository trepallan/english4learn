import auth from "./auth/auth";
import authorization from "../routes/authorization";
import courses from "../routes/couse";
import activies from "../routes/activities";

export default function startup(app: any) {
  // Free routes
  app.use("/authorization", authorization);
  app.use("/courses", courses);

  // Auth routes
  app.use("/activities", auth, activies);
}
