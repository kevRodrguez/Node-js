import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todo } from "@prisma/client";
import { error } from "console";
import { create } from "domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


export class TodosController {

    //* Dependency Injection
    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid id, not a number' });
            return;
        }

        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        })

        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        return res.json(todo);
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        const todo = await prisma.todo.create({
            // El error ocurre porque la instancia de CreateTodoDto (generada con new CreateTodoDto(text)) no es un objeto literal, sino una clase con propiedades y métodos adicionales. Prisma espera que la propiedad data sea un objeto plano que coincida estrictamente con el tipo definido en su esquema (todoCreateInput)
            data: JSON.parse(JSON.stringify(createTodoDto)),
        });

        res.json(todo);
    }


    public updateTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const [error, updateTodo] = UpdateTodoDto.create({ ...req.body, id })

        if (error) {
            res.status(400).json({ error });
            return;
        }

        const todo = await prisma.todo.findFirst({
            where: {
                id: id,
            },
        })

        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: id }, 
            data: JSON.parse(JSON.stringify(updateTodo?.getValues)),
        });

        res.json(updatedTodo);

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid id, not a number' });
            return;
        }

        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        });

        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }


        const deletedTodo = await prisma.todo.delete({
            where: {
                id: id,
            }
        });

        (deletedTodo)
            ? res.json({ deletedTodo })
            : res.status(400).json({ error: `Todo with id ${id} not found` });
    }
}
