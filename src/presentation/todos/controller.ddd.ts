import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todo } from "@prisma/client";
import { error } from "console";
import { create } from "domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodosController {

    //* Dependency Injection
    constructor(
        private readonly todoRepository: TodoRepository,

    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        console.log(todos);
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        
        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);
            
        } catch (error) {
            return res.status(400).json({ error: `Todo with id ${id} not found` });
        }

    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo);
    }


    public updateTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const [error, updateTodo] = UpdateTodoDto.create({ ...req.body, id })

        if (error) {
            res.status(400).json({ error });
        }

        const updatedTodo = await this.todoRepository.updateById(updateTodo!);
        res.json(updatedTodo);

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid id" });
        }

        try {
            const deletedTodo = await this.todoRepository.deleteById(id);
            return res.json(deletedTodo);
        } catch (error) {
            return res.status(400).json({ error: `Todo with id ${id} not found` });

        }
    }
}
