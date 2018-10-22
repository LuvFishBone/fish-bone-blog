import jwt from 'jsonwebtoken'
import User from '../models/users'
import {
    secret
} from '../config'

class TokenControllers {

    async createToken(ctx) {
        const {
            username,
            password
        } = ctx.request.body
        const res = (await User.findUser(username))[0]
        if (res) {
            if (password === res.password) {
                const token = jwt.sign({
                    //exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60// 一天
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60// 一天
                }, secret)
                ctx.body = token
            }
            else {
                ctx.throw(401, '用户名或密码错误')
            }
        }
        else {
            ctx.throw(401, '用户名不存在！')
        }
    }

    checkToken(ctx) {
        ctx.body = 'auth success'
    }
}

export default new TokenControllers()
