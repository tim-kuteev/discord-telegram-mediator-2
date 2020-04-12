import { Logger } from "./logger";
import { ConsoleLogger } from "./console/console-logger";

export class LoggerFactory {
    private static _current: Logger;

    static get current(): Logger {
        return LoggerFactory._current ?? (LoggerFactory._current = LoggerFactory.init());
    }

    private static init(): Logger {
        // Todo: add other loggers here
        return new ConsoleLogger();
    }
}