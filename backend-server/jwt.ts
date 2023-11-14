import jwt from 'jwt-simple'
import { env } from './env'
import { Request } from 'express'
import { Bearer } from "permit";
import { HttpError } from './error';

const permit = new Bearer({
    query: "access_token",
});


export type JWTPayload = {
    id: number
    email: string
    is_admin: boolean
}

export function encodeJWT(payload: JWTPayload) {
    let token = jwt.encode(payload, env.JWT_SECRET)
    return token
}

export function decodeToken(req: Request): JWTPayload {
    let token: string
    try {
        token = permit.check(req)
    } catch (error) {
        throw new HttpError(401, 'missing bearer token')
    }
    try {
        let payload: JWTPayload = jwt.decode(token, env.JWT_SECRET)
        return payload
    } catch (error) {
        throw new HttpError(401, 'invalid jwt token')
    }
}
