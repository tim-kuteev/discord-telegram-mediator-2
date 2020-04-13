import { ContextMessageUpdate } from 'telegraf';
import { TelegramEvent } from './telegram-event';

export class MessageTelegramEvent implements TelegramEvent {

  readonly name = 'message';

  action(ctx: ContextMessageUpdate): void {
    console.log(ctx.message);
    if (ctx.message) {
      ctx.reply('Message: ' + ctx.message.text);
    }
  }
}
