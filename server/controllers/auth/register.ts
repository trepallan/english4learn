import UserModel from "../../models/user";
import jwtCreate from "../../utils/jwtCreate";
import bcrypt from "bcrypt";

async function register(request: any, response: any) {
  try {
    const { username, password, confirmPassword, email } = request.body;
    if (password !== confirmPassword) {
      return response.status(400).json({
        message: "Passwords do not match",
      });
    }

    const hashed_password = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      username,
      hashed_password,
      email,
    });

    if (!user) {
      return response.status(400).json({
        message: "Failed to create user",
      });
    }

    const auth = jwtCreate(user);
    return response.status(201).json({ user, auth });
  } catch (error) {
    return response.status(400).json({
      message: "Internal server error",
    });
  }
}

export default register;
