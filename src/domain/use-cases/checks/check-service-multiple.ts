//revisar el servicio de un sitio web usando cron

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallback = (error: string) => void;


//usando implements se obliga a que la clase que implemente esta interfaz tenga los metodos de ella
export class CheckServiceMultiple implements CheckServiceUseCase {

    constructor(
        //esto es igual a definir el atributo e iniciarlo en el constructor

        private readonly logRepository: LogRepository[],
        private readonly successCallback: SucessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    private callLogs(log: LogEntity) {
        this.logRepository.forEach(logRepository => {
            logRepository.saveLog(log);
        });
    }

    async execute(url: string): Promise<boolean> {
        try {
            const request = await fetch(url);
            if (!request.ok) {

                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity({
                message: `Service ${url} is working`,
                level: LogSeverityLevel.low,
                origin: 'check-service'
            });
            this.callLogs(log);


            this.successCallback();
            return true;
        } catch (error) {

            const errorMessage = `${url} is not ok.  ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service'
            });
            this.callLogs(log);

            this.errorCallback(errorMessage);
            return false;

        }

        return true;
    }
}

