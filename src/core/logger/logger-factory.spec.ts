import { LoggerFactory } from './logger-factory';

test('should return logger instance', () => {
  expect(LoggerFactory.get('test')).toHaveProperty('log');
});
