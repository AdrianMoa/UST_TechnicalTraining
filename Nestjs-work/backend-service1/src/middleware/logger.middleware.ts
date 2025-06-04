import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const logDirectory = path.join(__dirname, '..', 'logs');
        const logFile = path.join(logDirectory, 'app.log');

        //Ensure the logs directory exists
        if(!fs.existsSync(logDirectory)){
            fs.mkdirSync(logDirectory);
        }

        const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${req.ip}\n`;

        //Append the log message to the file
        fs.appendFile(logFile, logMessage, (err) => {
            if (err) {
                console.error('Failed to write log: ', err);
            }
        });
        
        next();
    }
}