import auth from "./auth/auth";
import authorization from "../routes/authorization";

export default function startup(app: any) {
  app.use("/authorization", authorization);
}
