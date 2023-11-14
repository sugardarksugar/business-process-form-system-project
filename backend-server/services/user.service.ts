import { Knex } from 'knex'
import { comparePassword } from '../hash'
import { HttpError } from '../error';
import { encodeJWT } from '../jwt'
// import { string } from 'cast.ts';
export class UserService {
    constructor(public knex: Knex) { }

    async login(user: { email: string; password: string; }) {
        let row = await this.knex
            .select('id', 'email', 'hash_password', 'is_admin')
            .from('user')
            .where('email', user.email)
            .first()

        if (!row) {
            throw new HttpError(404, 'user not found')
        }

        let isMatched = await comparePassword({
            password: user.password,
            password_hash: row.hash_password,
        })

        if (!isMatched) {
            throw new HttpError(401, 'wrong username or password')
        }

        let id = row.id
        let email = row.email
        let is_admin = row.is_admin
        let token = encodeJWT({ id, email, is_admin })

        return token
    }

    async checkEmailDup(email: string) {
        return await this.knex
            .select('email')
            .from('user')
            .where('email', email)
    }

    async createUser(email: string, password: string) {

        await this.knex(`user`).insert([{
            email: email,
            hash_password: password,
            is_admin: false
        }])
    }

}
