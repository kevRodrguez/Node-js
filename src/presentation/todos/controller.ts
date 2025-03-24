import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy milk', completed: false, completedAt: new Date() },
    { id: 2, text: 'Buy eggs', completed: true, completedAt: null },
    { id: 3, text: 'Buy bread', completed: false, completedAt: new Date() },
];

export class TodosController {
    
    //* Dependency Injection
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }
    
    public getTodoById = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid id, not a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    public createTodo (req: Request, res: Response) {
        const {text, completed} = req.body;
        if (!text) {
            res.status(400).json({ error: 'Text is required' });
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            text,
            completed: completed || false,
            completedAt: new Date()
        }

        todos.push(newTodo);

        res.json(newTodo);
    }


    public updateTodo = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid id, not a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        const {text, completedAt} =req.body;
        // if (!text) {
        //     res.status(400).json({ error: 'Text is required' });
        //     return;
        // }

        todo.text = text || todo.text;

        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid id, not a number' });
            return;
        }
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        // const index = todos.findIndex(todo => todo.id === id); // Returns -1 if no matching element is found
        // if (index === -1) {
        //     res.status(404).json({ error: `Todo with id ${id} not found` });
        //     return;
        // }
        // todos.splice(index, 1);

        todos.splice(todos.indexOf(todo),1);
        res.json({todo});
    }
}
 