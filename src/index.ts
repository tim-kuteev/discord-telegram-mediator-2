import { Logger } from 'winston';
import { LoggerFactory } from './core/logger/logger-factory';
import { TelegramPlugin } from './plugin/telegram/telegram.plugin';

const logger: Logger = LoggerFactory.get('index');

logger.info('Starting...');

new TelegramPlugin().init().catch(logger.error);
