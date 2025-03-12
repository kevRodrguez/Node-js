//plugin para usar variables de entorno parseadas
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo/";
import { ServerApp } from "./presentation/server";



//Para usar variables de entorno se debe instalar dotenv
//npm install dotenv
import 'dotenv/config';
import { LogSeverityLevel } from "./domain/entities/log.entity";
import { LogRepository } from "./domain/repository/log.repository";
import { PostgresLogDatasource } from "./infraestructure/datasources/postgres-log.datasource";



//esta es una funcion anonima autoejecutable
(async () => {
    main();
})();

async function main(this: any) {
    //conectarse a la base de datos mongo
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // este Cliente tiene toda la configuración basada en el schema.prisma.
    // const prisma = new PrismaClient();
    //para crear un nuevo registro en la base de datos
    // const newlog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'test message desde prisma',
    //         origin: 'App.ts',
    //     }
    // })

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM'
    //     }
    // });

    // console.log(logs);


    //Crear una colección (tabla), y un documento (registro)
    // const newLog = await LogModel.create({
    //     message: 'test message desde mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // })

    // await newLog.save();
    //console.log(newLog);

    //buscar todos los registros de la coleccion
    //const logs = await LogModel.find();
    //buscar alguno en especifico

    //const logs = await LogModel.find().where('level').equals('high');

    // console.log(logs);

    ServerApp.start();
    // console.log(envs);
}


