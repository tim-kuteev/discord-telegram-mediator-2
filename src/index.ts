import { Logger } from './core/logger/logger';
import { LoggerFactory } from './core/logger/logger-factory';
import { TelegramPlugin } from './plugin/telegram/telegram.plugin';

const logger: Logger = LoggerFactory.current;

logger.info('Starting...');

new TelegramPlugin().init().catch(console.error);
