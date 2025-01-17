import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

import AppError from "../errors/AppError";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token us missing", 401);
    }

    const [, token] = authHeader.split(" ");

    const { secret } = authConfig.jwt;

    try {
        const decoded = verify(token, secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError("invalid JWT token", 401);
    }
}
