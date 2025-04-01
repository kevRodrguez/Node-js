import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.imp";


export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        // Inyección de dependencias
        // Esto permite que cada clase tenga acceso a las dependencias necesarias para funcionar correctamente
        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);

        const todosController = new TodosController(todoRepository);

        //* Asegurar que los métodos están bien referenciados
        router.get('/', (req, res) => {
            todosController.getTodos(req, res);
        });
        router.get('/:id', (req, res) => {
            todosController.getTodoById(req, res);
        });

        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', (req, res) => { todosController.deleteTodo(req, res) });


        return router;
    }
}