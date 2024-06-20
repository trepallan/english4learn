import jwt from "jsonwebtoken";
import UserModel from "../../models/user";
import "dotenv/config";

async function refreshToken(req: any, res: any) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: "expired refresh token" });
        }

        const currentTime = Date.now() / 1000;
        if (currentTime > decoded.exp) {
          return res.status(401).json({ message: "expired refresh token" });
        }

        const user = await UserModel.findById(decoded._id);
        if (!user)
          return res.status(401).json({ message: "expired refresh token" });

        const token = jwt.sign(
          { _id: decoded._id, username: decoded.username },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        );

        const newRefreshToken = jwt.sign(
          { _id: decoded._id, username: decoded.username },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "7d",
          }
        );

        res.json({ token, refreshToken: newRefreshToken });
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "expired refresh token" });
  }
}

export default refreshToken;
