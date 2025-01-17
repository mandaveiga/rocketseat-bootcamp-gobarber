import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

import AppError from "../errors/AppError";

import User from "../models/User";

interface Request {
    email: string;
    password: string;
}
interface Response {
    token: string;
    user: User;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError("Incorrect email/password combination", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Incorrect email/password combination", 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expireIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
