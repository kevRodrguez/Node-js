import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository{

    constructor(
        //esto es igual a definir el atributo en la clase y luego asignarle el valor en el constructor en una sola linea this.logDataSource = logDataSource
        private readonly logDataSource: LogRepository
    ){}

    async saveLog(log: LogEntity): Promise<void> {
       return this.logDataSource.saveLog(log);
    }
    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severity);
    } 

}