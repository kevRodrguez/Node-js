import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDatasourceImpl implements TodoDatasource {

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        
        return todos.map((todo) => TodoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<TodoEntity> {

        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        })


        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }

        return TodoEntity.fromObject(todo);
    }

    
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        
        const todo = await prisma.todo.create({
            // El error ocurre porque la instancia de CreateTodoDto (generada con new CreateTodoDto(text)) no es un objeto literal, sino una clase con propiedades y métodos adicionales. Prisma espera que la propiedad data sea un objeto plano que coincida estrictamente con el tipo definido en su esquema (todoCreateInput)
            data: JSON.parse(JSON.stringify(createTodoDto)),
        });

        return TodoEntity.fromObject(todo);
        
    }

    async updateById(updateTododto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTododto.id);


        
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTododto.id }, 
            data: JSON.parse(JSON.stringify(updateTododto?.getValues)),
        });

        return TodoEntity.fromObject(updatedTodo);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await this.findById(id);


        const deletedTodo = await prisma.todo.delete({
            where: {
                id: id,
            }
        });

        return TodoEntity.fromObject(deletedTodo);

    }
    
}