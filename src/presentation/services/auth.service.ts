import { bcriptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, LoginUserEntity, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";


export class AuthService {
    //Dependency Injection
    constructor(
        private readonly emailService: EmailService,

    ) { }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existingUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existingUser) throw CustomError.badRequest('Email already in use');

        try {
            const user = new UserModel(registerUserDto);

            // encriptar contraseña
            user.password = bcriptAdapter.hash(registerUserDto.password);

            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);

            //JWT Para mantener la autenticación del usuario
            const token = await JwtAdapter.generateToken({ id: userEntity.id, email: userEntity.email }, '2h', envs.JWT_SEED);
            if (!token) throw CustomError.internalServer('Error generating token');

            //email de confirmación
            this.sendEmailConfirmation(userEntity.email);

            return {
                user: userEntity,
                token: token,
            };

        } catch (error) {
            throw CustomError.internalServer(`Error creating user ${error}`);

        }
    }


    public async loginUser(loginUserDto: LoginUserDto) {
        //findone para verificar si existe
        const existingUser = await UserModel.findOne({ email: loginUserDto.email });
        if (!existingUser) throw CustomError.badRequest('Not existing user');

        //isMatch para verificar la contraseña... bcript compare('12456', KFsafjdfPPHdask)
        const isMatch = bcriptAdapter.compare(loginUserDto.password, existingUser.password)

        if (!isMatch) throw CustomError.badRequest('Invalid password')

        const { password, ...userEntity } = UserEntity.fromObject(existingUser);


        const token = await JwtAdapter.generateToken({ id: userEntity.id, email: userEntity.email }, '2h', envs.JWT_SEED);
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            user: userEntity, //no enviar el password
            token: token,
        }

    }

    private sendEmailConfirmation = async (email: string) => {
        //generar el token que se va a enviar al email
        const token = await JwtAdapter.generateToken({ email }, '2h', envs.JWT_SEED);
        if (!token) throw CustomError.internalServer('Error generating token');

        //enviar el link de confimación
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h1 style="color: #333; text-align: center;">Email Confirmation</h1>
            <p style="font-size: 16px; line-height: 1.5;">Thank you for registering! Please confirm your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Confirm Email</a>
            </div>
            
            <p style="font-size: 14px; line-height: 1.5;">If the button doesn't work, you can also click on the link below or copy and paste it into your browser:</p>
            <p style="word-break: break-all; font-size: 14px;"><a href="${link}">${link}</a></p>
            
            <p style="font-size: 14px; color: #777; margin-top: 30px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
        `;

        const options = {
            to: email,
            subject: 'Email Confirmation',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error sending email confirmation');

    }

    public validateEmail = async (token: string) => {
        //verificar el token
        const payload = await JwtAdapter.ValidateToken(token)
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not found in token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.badRequest('User not found');
        if (user.emailValidated) throw CustomError.badRequest('Email already confirmed');

        //actualizar el usuario
        user.emailValidated = true;
        await user.save();


        return true;


    }
}