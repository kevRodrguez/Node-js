


export class TodoEntity {

    id: number
    text: string
    completedAt?: Date | null

    public constructor( id: number, text: string, completedAt?: Date | null,)
    {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }

    

    get isCompleted() {
        return !!this.completedAt; // true if completedAt is not null
    }

    //mapper
    public static fromObject( obj: {[key: string]:any}): TodoEntity {
        const { id, text, completedAt} = obj;

        if (!id || !text) {
            throw new Error('Invalid object');
        }

        if (!text) {
            throw new Error('Invalid object');
        }

        //convertir a Date
        let completedAtDate;
        if (completedAt) {
            completedAtDate = new Date(completedAt);
            if (isNaN(completedAtDate.getTime())) {
                throw new Error('completedAt is a invalid date');
            }
        }
        
        return new TodoEntity(id, text, completedAtDate);
    }




}