//plugin para usar variables de entorno parseadas
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo/";
import { ServerApp } from "./presentation/server";

//Para usar variables de entorno se debe instalar dotenv
//npm install dotenv
import 'dotenv/config';



//esta es una funcion anonima autoejecutable
(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

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


