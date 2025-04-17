import { CustomError } from "../errors/custom.error";

export class LoginUserEntity {
    constructor(   
        public email: string,
        public password: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const {email, password} = object;



        if (!email) { throw CustomError.badRequest('User email is required'); }
        if (!password) { throw CustomError.badRequest('User password is required'); }


        return new LoginUserEntity(email, password);

    }

}