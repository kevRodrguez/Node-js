import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';

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
                const url = 'https://www.google.com';
                
                new CheckService(
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