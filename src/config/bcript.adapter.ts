import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class bcriptAdapter {
    static hash(password: string) {
        const salt = genSaltSync();
        return hashSync(password, salt);
    }

    static compare(password:string, hashed:string) {
        return compareSync(password, hashed);
    }
}

// export const bcriptAdapter = {
//     hash: (password: string) => {
//         const salt = genSaltSync();
//         return hashSync(password, salt);
//     },

//     compare: (password:string, hashed:string) => {
//         return compareSync(password, hashed);
//     }
// }