import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";

export const tokenVerify = (token: string) => {
    try {
        const decoded = jwt.verify(token, config.accessSecret) as JwtPayload;

        return decoded;
    } catch (error) {
        throw new Error("Invalid token")
    }

};

