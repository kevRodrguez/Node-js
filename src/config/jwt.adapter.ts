import { error } from 'console';
import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from './envs';
import { decode } from 'punycode';

// const JWT_SEED = envs.JWT_SEED;


export class JwtAdapter {


    static async generateToken(payload: any, duration: string = '2h', secret: string) {
        return new Promise((resolve) => {
            jwt.sign(payload, secret, { expiresIn: duration } as SignOptions, (err, token) => {

                if (err) return resolve(null);

                resolve(token)

            });
        })

    }

    //leccion 294 explica que es <T>
    static ValidateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_SEED, (err, decoded)=> {
                if (err) return resolve(null);

                resolve(decoded as T)
            })
        })
    }
}