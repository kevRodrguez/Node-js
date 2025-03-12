import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { Attachment } from "nodemailer/lib/mailer";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    //aca podemos ver que cualquier data source que implemente la interfaz LogDataSource puede ser usada
    new FileSystemDataSource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class ServerApp {
    public static start() {
        console.log('Server started!');


        // Para probar CRON desde y ver logs desde la terminal
        CronService.createJob(
            '*/10 * * * * *',
            () => {
                const url = 'http://google.com';

                new CheckServiceMultiple(
                    [fsLogRepository,
                    mongoLogRepository,
                    postgresLogRepository],
                    
                    () => {
                        const date = new Date();
                        console.log(`${url} is ok at: ${date}`);
                    },
                    (error) => { 
                        console.log(`Check service error: ${error}`);
                    }
                ).execute(url);
                // new CheckService().execute('http://localhost:3000')

            }
        );

        //tomar lgos de la base de datos
        // LogRepository.getLogs(LogSeverityLevel.high).then(logs => {
        //     console.log('Logs: ', logs);
        // });


        //Mandar email

        //aca estamos mandando el email a traves de un caso de uso
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['andresgalan725@gmail.com']
        // )

        // const emailService = new EmailService();

        // emailService.sendEmailWithFileSystemLogs(
        //     'kevrodriguezmail@gmail.com'
        // );




    }
}