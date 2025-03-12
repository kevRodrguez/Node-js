import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {

        //Esta línea declara una constante llamada level y le asigna el valor que se obtiene al indexar el objeto severityEnum con la clave log.level. En otras palabras, se accede a severityEnum utilizando el valor de log.level para obtener su correspondiente valor. Esto es útil cuando quieres mapear, por ejemplo, un nivel numérico de severidad a una descripción o valor más legible.
        const level = severityEnum[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                message: log.message,
                level: level,
                origin: log.origin,
            }
        });
        // console.log('Postgres Log created: ', newLog);
    }

    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severity];
        
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        });

        return logs.map(postgreslog => LogEntity.fromObject(postgreslog));
    }

    // Para obtener logs de la base de datos
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM'
    //     }
    // });


    //para crear un nuevo registro en la base de datos
    // const newlog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'test message desde prisma',
    //         origin: 'App.ts',
    //     }
    // })

}