import jwt from "jsonwebtoken";
import "dotenv/config";
/////// Takes user object and returns token and refresh token ///////
function jwtGenerate(user: any) {
  //   Generate JWT
  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return { token, refreshToken };
}

export default jwtGenerate;
