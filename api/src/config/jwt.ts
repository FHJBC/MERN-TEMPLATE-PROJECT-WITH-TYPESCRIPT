import { Secret } from "jsonwebtoken";
export const secret: Secret = process.env.JWT_SECRET as Secret;
