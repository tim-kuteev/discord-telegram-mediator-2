import { ContextMessageUpdate } from 'telegraf';
import { TelegramCommand } from './telegram-command';

export class HelpTelegramCommand implements TelegramCommand {

  readonly name = 'help';
  readonly description = 'Prints help';

  action(ctx: ContextMessageUpdate): void {
    console.log(ctx.message);
    ctx.reply('Help');
  }
}
