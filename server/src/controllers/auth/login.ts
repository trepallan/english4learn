import UserModel from "../../../models/user";
import bcrypt from "bcrypt";
import jwtCreate from "../../utils/jwtCreate";

async function login(request: any, response: any) {
  const { email, password } = request.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "User not found",
      });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.hashed_password);

      if (!isMatch) {
        return response.status(400).json({
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: "Invalid email or password",
      });
    }

    const auth = jwtCreate(user);
    return response.status(200).json({ user, auth });
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error",
    });
  }
}

export default login;
