import { Plugin } from '../plugin';
import * as COMMANDS from './command';
import * as EVENTS from './event';

export class TelegramPlugin implements Plugin {

  async init(): Promise<void> {
    const bot = new (require('telegraf'))(process.env.TELEGRAM_TOKEN); // TODO: ? inject TelegramBot instead ?

    for (const Command of Object.values(COMMANDS)) {
      const command = new Command();
      bot.command(command.name, command.action);
    }

    for (const Event of Object.values(EVENTS)) {
      const event = new Event();
      bot.on(event.name, event.action);
    }

    await bot.launch();
  }
}
