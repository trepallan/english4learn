import jwt from "jsonwebtoken";
import "dotenv/config";
/////// Takes user object and returns token and refresh token ///////
function jwtGenerate(user: any) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("No secret specified from environment");

  //   Generate JWT
  const token = jwt.sign({ _id: user._id, username: user.username }, secret, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(
    { _id: user._id, username: user.username },
    secret,
    {
      expiresIn: "7d",
    }
  );

  return { token, refreshToken };
}

export default jwtGenerate;
