import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const todosController = new TodosController();

        //* Asegurar que los métodos están bien referenciados
        router.get('/', (req, res) => {
            todosController.getTodos(req, res);
        }); 
        router.get('/:id', (req, res) => {
            todosController.getTodoById(req, res);
        });

        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);


        return router;
    }
}