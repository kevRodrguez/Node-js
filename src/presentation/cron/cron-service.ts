import { CronJob } from "cron";

type CronTime = string | Date
type OnTick = () => void

// este es el patrón adaptador para la librería cron

export class CronService{
    static createJob( cronTime:CronTime, onTick: OnTick): CronJob {

        const job = new CronJob(
            cronTime, // cronTime (every 1 minute)
            onTick,

        );
        job.start();
        
        return job;
    }
}