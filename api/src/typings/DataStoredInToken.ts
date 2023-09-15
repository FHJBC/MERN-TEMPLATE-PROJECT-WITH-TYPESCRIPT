import * as jwt from "jsonwebtoken";

interface DataStoredInToken extends jwt.JwtPayload {
  _id: string;
}

export default DataStoredInToken;
