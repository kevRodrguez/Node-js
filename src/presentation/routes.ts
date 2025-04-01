import { Router } from "express";
import { TodosController } from "./todos/controller.ddd";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        // const todosController = new TodosController();

        //* Routes

        // el enrutador utilizará el enrutador de la clase TodoRoutes
        // router.get('/api/todos', (req, res) => todosController.getTodos(req, res));
        router.use('/api/todos', TodoRoutes.routes);


        return router;
    }
}