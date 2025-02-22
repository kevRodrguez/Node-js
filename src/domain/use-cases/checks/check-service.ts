//revisar el servicio de un sitio web usando cron

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallback = (error: string) => void;


//usando implements se obliga a que la clase que implemente esta interfaz tenga los metodos de ella
export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SucessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    async execute(url: string): Promise<boolean> {
        try {
            const request = await fetch(url);
            if (!request.ok) {

                throw new Error(`Error on check service ${url}`);
            }

            this.successCallback();
            return true;
        } catch (error) {
            this.errorCallback(`${error}`);
            return false;

        }

        return true;
    }
}

