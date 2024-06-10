import UserModel from "../../../models/user";
import bcrypt from "bcrypt";
import jwtCreate from "../../utils/jwtCreate";

async function login(request: any, response: any) {
  const { email, password } = request.body;

  try {
    const user = await UserModel.findOne({ email }).select("+hashed_password");
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
      console.log(error);
      return response.status(500).json({
        message: "Invalid email or password",
      });
    }

    // Creating a copy of the user object without the hashed password
    const userWithoutPassword = { ...user.toObject() } as any;
    delete userWithoutPassword.hashed_password;

    const auth = jwtCreate(userWithoutPassword);
    return response.status(200).json({ user: userWithoutPassword, auth });
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error",
    });
  }
}

export default login;
