import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    publicPath?: string;
}


export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {
        //* Middlewares
        this.app.use(express.json()) // middleware para parsear el body de las peticiones raw
        this.app.use(express.urlencoded({ extended: true })) // para permitir el x-www-form-urlencoded

        //* Public Folder
        this.app.use(express.static(this.publicPath));


        //* Routes
        this.app.use(this.routes);



        //* Esto sirve para los SPA, single page applications
        // this.app.get('*', (req, res) => {
        //     const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
        //     res.sendFile(indexPath);
        // })

        this.app.listen(this.port, () => {
            console.log(`El server está corriendo en el puerto: ${this.port}`);
        });
    }
}