
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel; //enum
    message: string;
    createdAt?: Date;
    origin: string;
}


export class LogEntity {
    public level: LogSeverityLevel; //enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
        json = (json === '' ? '{}' : json);
        
        const { message, level, createdAt, origin } = JSON.parse(json); //opuesto del stringify
        if (!message || !level || !createdAt) {
            throw new Error('Invalid LogEntity');
        }
        return new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin // ej. 'log.entity.js'
        });
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin
        });
        return log;
    }
}

