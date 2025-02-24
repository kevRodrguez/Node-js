import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImpl(
    //aca podemos ver que cualquier data source que implemente la interfaz LogDataSource puede ser usada

    new FileSystemDataSource(),
    // new postgresSQLLogDatasource(),
    // new mongoDBLogDatasource()
);

export class ServerApp {
    public static start() {
        console.log('Server started');

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const date = new Date();
        //         console.log('5 sec - Job executed at: ', date);
        //     }

        // );
        //Se pueden agregar aca las tareas programadas necesarias
        CronService.createJob(
            '*/10 * * * * *',
            () => {
                const url = 'http://localhost:3000';
                
                new CheckService(
                    fileSystemLogRepository,
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

    }
}