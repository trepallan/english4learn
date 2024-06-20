import jwt from "jsonwebtoken";

async function auth(request: any, response: any, next: any) {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const jwtSecret = process.env.JWT_SECRET;
    if (!token || token === "null") {
      return response.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
    const decodedToken = jwt.verify(token, jwtSecret as string);

    // retrieve the user details of the logged in user
    const user = decodedToken;

    // pass the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}

export default auth;
