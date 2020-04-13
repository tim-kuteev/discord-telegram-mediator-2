import * as winston from 'winston';
import { Logger } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');

const ROTATION_OPTIONS = {
  datePattern: 'YYYYMMDD',
  maxSize: '5m',
  maxFiles: '30d',
  zippedArchive: true,
};

export class LoggerFactory {

  private static readonly _formatConsole = winston.format.combine(
    winston.format.ms(),
    winston.format.printf((info: any) => {
      const {level, label, ms, message} = info;
      return `\x1b[36m[${ms.padStart(6)}] \x1b[33m${level.toUpperCase().padEnd(7)} \x1b[34m(${label})\x1b[0m: ${message}`;
    }),
  );

  private static readonly _formatFile = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info: any) => {
      const {level, label, timestamp, message} = info;
      return `[${timestamp.substring(11, 23)}] ${level.toUpperCase()} (${label}): ${message}`;
    }),
  );

  private static readonly _errorFormatter = winston.format((info: any) => {
    if (info instanceof Error) {
      return {...info, message: info.stack};
    }
    if (info.message instanceof Error) {
      return {...info, message: info.message.stack};
    }
    if (typeof info.stack === 'string') {
      return {...info, message: `${info.message}\n${info.stack}`};
    }
    return info;
  });

  static get(label: string): Logger {
    if (!winston.loggers.has(label)) {
      LoggerFactory._initLogger(label);
    }
    return winston.loggers.get(label);
  }

  // TODO: return type ?
  private static get _transports(): any[] {
    const transports = [];

    transports.push(new winston.transports.Console({
      level: 'debug',
      format: LoggerFactory._formatConsole,
    }));

    transports.push(new DailyRotateFile({
      filename: 'logs/%DATE%_combined.log',
      format: LoggerFactory._formatFile,
      ...ROTATION_OPTIONS,
    }));

    transports.push(new DailyRotateFile({
      level: 'error',
      filename: 'logs/%DATE%_errors.log',
      format: LoggerFactory._formatFile,
      ...ROTATION_OPTIONS,
    }));

    return transports;
  }

  private static _initLogger(label: string): void {
    winston.loggers.add(label, {
      exitOnError: false,
      format: winston.format.combine(
        LoggerFactory._errorFormatter(),
        winston.format.label({label}),
        winston.format.splat(),
      ),
      transports: LoggerFactory._transports,
    });
  }
}
