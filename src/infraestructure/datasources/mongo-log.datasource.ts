import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        await newLog.save();
        console.log('Mongo Log created: ', newLog);
    }
    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        // const logs = await LogModel.find().where('level').equals(severity);
        const logs = await LogModel.find({
            level: severity
        })

        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));

    }
    


}