"use strict";
//revisar el servicio de un sitio web usando cron
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckService = void 0;
//usando implements se obliga a que la clase que implemente esta interfaz tenga los metodos de ella
class CheckService {
    constructor(successCallback, errorCallback) {
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }
    execute(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield fetch(url);
                if (!request.ok) {
                    throw new Error(`Error on check service ${url}`);
                }
                this.successCallback();
                return true;
            }
            catch (error) {
                this.errorCallback(`${error}`);
                return false;
            }
            return true;
        });
    }
}
exports.CheckService = CheckService;
