import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

// clase que no se puede instanciar directamente y que sirve de plantilla para otras clases. Puede contener métodos con implementación y métodos abstractos (sin implementación) que obligan a las clases que la extiendan a definirlos.

export abstract class TodoDatasource {
    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
    
    //todo: paginación
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById( id: number ): Promise<TodoEntity>;
    abstract updateById( updateTododto: UpdateTodoDto ): Promise<TodoEntity>;
    abstract deleteById( id: number ): Promise<TodoEntity>;

}