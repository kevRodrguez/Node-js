"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const cron_1 = require("cron");
// este es el patrón adaptador para la librería cron
class CronService {
    static createJob(cronTime, onTick) {
        const job = new cron_1.CronJob(cronTime, // cronTime (every 1 minute)
        onTick);
        job.start();
        return job;
    }
}
exports.CronService = CronService;
