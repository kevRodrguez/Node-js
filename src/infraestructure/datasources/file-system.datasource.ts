import fs from 'fs';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { error } from 'console';


//esta debe de ser la implementación de las reglas de negocio definidas en domain
export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    //cuando se cree una instancia de esta clase, esta mediante el constructor, llamará a la función createLogsFiles que se encargará de crear los archivos de logs si no existen en el sistema de archivos del servidor. cada que la app se levanta, verificará si existen los archivos de logs, si no existen, los creará.

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        // if(!fs.existsSync(this.allLogsPath)){
        //     fs.writeFileSync(this.allLogsPath, '');
        // }

        // if(!fs.existsSync(this.mediumLogsPath)){
        //     fs.writeFileSync(this.mediumLogsPath, '');
        // }

        // if(!fs.existsSync(this.highLogsPath)){
        //     fs.writeFileSync(this.highLogsPath, '');
        // }

        //alternativa mas elegante al codigo de arriba
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        });
    };

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        //si es log no continua evaluando los demas ifs
        if (newLog.level === LogSeverityLevel.low) {
            return;
        }

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(
            (log) => LogEntity.fromJson(log)
        )
        return logs;
    }



    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} is not a valid severity level, not implemented yet`);
        }

    }


}