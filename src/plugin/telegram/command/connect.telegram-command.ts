import { ContextMessageUpdate } from 'telegraf';
import { TelegramCommand } from './telegram-command';

export class ConnectTelegramCommand implements TelegramCommand {

  readonly name = 'connect';
  readonly description = 'Connects';

  action(ctx: ContextMessageUpdate): void {
    console.log(ctx.message);
    ctx.reply('Connect');
  }
}
