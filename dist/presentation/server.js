"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const cron_service_1 = require("./cron/cron-service");
const check_service_1 = require("../domain/use-cases/checks/check-service");
class ServerApp {
    static start() {
        console.log('Server started');
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const date = new Date();
        //         console.log('5 sec - Job executed at: ', date);
        //     }
        // );
        //Se pueden agregar aca las tareas programadas necesarias
        cron_service_1.CronService.createJob('*/10 * * * * *', () => {
            const url = 'https://www.google.com';
            new check_service_1.CheckService(() => {
                const date = new Date();
                console.log(`${url} is ok at: ${date}`);
            }, (error) => {
                console.log(`Check service error: ${error}`);
            }).execute(url);
            // new CheckService().execute('http://localhost:3000')
        });
    }
}
exports.ServerApp = ServerApp;
