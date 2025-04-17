import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { error, log } from "console";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../../domain";


export class AuthController {


    //Dependency Injection
    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }

        console.log(`${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserdto] = RegisterUserDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.authService.registerUser(registerUserdto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return
        }

        this.authService.loginUser(loginUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;
        this.authService.validateEmail(token)
        .then(() => res.json('email was validated properly'))
        .catch(error => this.handleError(error, res));
    }


}