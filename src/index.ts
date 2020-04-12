import { Logger } from './core/logger/logger';
import { LoggerFactory } from './core/logger/logger-factory';

const logger: Logger = LoggerFactory.current;

logger.info('Starting...');

