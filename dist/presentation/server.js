"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const cron_service_1 = require("./cron/cron-service");
const check_service_1 = require("../domain/use-cases/checks/check-service");
const log_impl_repository_1 = require("../infraestructure/repositories/log-impl.repository");
const file_system_datasource_1 = require("../infraestructure/datasources/file-system.datasource");
const fileSystemLogRepository = new log_impl_repository_1.LogRepositoryImpl(
//aca podemos ver que cualquier data source que implemente la interfaz LogDataSource puede ser usada
new file_system_datasource_1.FileSystemDataSource());
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
            const url = 'http://localhost:3000';
            new check_service_1.CheckService(fileSystemLogRepository, () => {
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
