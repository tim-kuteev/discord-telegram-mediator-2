import { LoggerFactory } from './logger-factory';
import { ConsoleLogger } from './console/console.logger';

test('should return current logger', () => {
    expect(LoggerFactory.current).toBeInstanceOf(ConsoleLogger);
  });
