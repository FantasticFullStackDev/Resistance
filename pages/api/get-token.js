// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (token) {
    res.send({
        "status:":"success",
        "message":"You are signed in",
        "token":JSON.stringify(token, null, 2)
    });
  } else {
    res.send({
        "status:":"fail",
        "message":"You can not signed in"
    });
  }
  res.end();
}