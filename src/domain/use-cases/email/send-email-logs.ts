import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

//los caso de uso son los que llaman a los repositorios
export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepostiory: LogRepository
    ) { }

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

            if (!sent) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Email log sent`,
                origin: 'send-email-logs.ts'
            })

            this.logRepostiory.saveLog(log)

            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email log not sent: ${error}`,
                origin: 'send-email-logs.ts'
            })

            this.logRepostiory.saveLog(log)
            return false;

        }
    }
}