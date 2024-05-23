import UserModel from "../../../models/user";
import bcrypt from "bcrypt";

function register(request: any, response: any) {
  const { username, password, confirmPassword, email } = request.body;

  if (password !== confirmPassword) {
    return response.status(400).json({
      error: new Error("Passwords do not match"),
    });
  }

  const hashed_password = bcrypt.hashSync(password, 10);
  const user = new UserModel({
    username,
    hashed_password,
    email,
  });
}

export default register;
