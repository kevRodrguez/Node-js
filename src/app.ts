import { ServerApp } from "./presentation/server";

//esta es una funcion anonima autoejecutable
(async() => {
    main();
})();

function main () {
    ServerApp.start();
}

