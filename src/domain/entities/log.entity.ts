
export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high'
}


export class LogEntity{
    public level: LogSeverityLevel; //enum
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJson = (json: string):LogEntity => {
        const {message, level, create} = JSON.parse(json); //opuesto del stringify
        if (!message || !level || !create){
            throw new Error('Invalid LogEntity');
        }
        return new LogEntity(message, level);
    }
}

