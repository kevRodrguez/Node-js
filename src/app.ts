//plugin para usar variables de entorno parseadas
import { envs } from "./config/plugins/envs.plugin";
import { ServerApp } from "./presentation/server";

//Para usar variables de entorno se debe instalar dotenv
//npm install dotenv
import 'dotenv/config';



//esta es una funcion anonima autoejecutable
(async () => {
    main();
})();

function main() {
    // ServerApp.start();
    console.log(envs);
}

