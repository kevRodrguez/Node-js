import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]
}

interface Attachment {
    filename: string,
    path: string
}

//patron adaptador para usar nodemailer
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },

        // port: 587,
        // secure: false, // true for port 465, false for other ports
    })

    
    constructor(){}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: options.to,
                subject: options.subject,
                html: options.htmlBody,
                attachments: options.attachments
            })

            // console.log(sentInformation);

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Email sent to ${to}`,
                origin: 'email.service.ts'
            })

            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email was not sent to ${to}`,
                origin: 'email.service.ts'
            })


            return false;
        }

    }


    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs de sistema';
        const htmlBody = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Logs del Sistema</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                background: #ffffff;
                margin: 20px auto;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            .content {
                margin-top: 10px;
                line-height: 1.6;
            }
            .log-summary {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
                font-size: 14px;
            }
            .attachments {
                margin-top: 20px;
                font-size: 14px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #ddd;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>📋 Reporte de Logs del Sistema</h2>
            <p>Hola,</p>
            <p>Este es el informe diario de logs del sistema. A continuación, encontrarás un resumen y los archivos adjuntos con los registros detallados.</p>
            
            <div class="log-summary">
                <p><strong>📅 Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>🔍 Nivel de logs:</strong> Bajo, Medio, Alto</p>
            </div>

            <div class="attachments">
                <p><strong>📎 Archivos adjuntos:</strong></p>
                <ul>
                    <li>logs-all.log (Todos los logs)</li>
                    <li>logs-high.log (Logs de alta prioridad)</li>
                    <li>logs-medium.log (Logs de prioridad media)</li>
                </ul>
                <p>Puedes revisar los archivos adjuntos para más detalles.</p>
            </div>

            <p>Si detectas alguna anomalía, por favor revisa los logs y toma las medidas necesarias.</p>

            <div class="footer">
                <p>📧 Este es un mensaje automático. Por favor, no respondas a este correo.</p>
            </div>
        </div>
    </body>
    </html>`;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })

    }


}