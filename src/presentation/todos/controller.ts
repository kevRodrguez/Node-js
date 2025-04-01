import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todo } from "@prisma/client";
import { error } from "console";
import { create } from "domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";


export class TodosController {

    //* Dependency Injection
    constructor(
        private readonly todoRepository: TodoRepository,

    ) { }

    public getTodos = (req: Request, res: Response) => {

        new GetTodos(this.todoRepository)
            .execute()
            .then(todos =>  res.json(todos))
            .catch( error => res.status(400).json({error: error.message}));

    }

    public getTodoById =  (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        new GetTodo(this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo))
            .catch( error => res.status(400).json({ error: error.message }) );

    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then((todo) => res.json(todo))
            .catch((error) => res.status(400).json({ error: error.message }) );
    }


    public updateTodo = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const [error, updateTodo] = UpdateTodoDto.create({ ...req.body, id })

        if (error) {
            res.status(400).json({ error });
        }

        new UpdateTodo(this.todoRepository)
            .execute(updateTodo!)
            .then(todo => res.json(todo))
            .catch((error) => res.status(400).json({ error: error.message }) );
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);


        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch((error) => res.status(400).json({ error: error.message }) );
    }
}
