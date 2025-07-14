import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return user;
  } catch {
    return null;
  }
}
