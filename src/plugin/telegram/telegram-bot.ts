import * as Telegraf from 'telegraf';

// TODO: doesn't work
export class TelegramBot extends Telegraf {

  private _chatId: number;

  constructor() {
    super(process.env.TELEGRAM_TOKEN);
  }
}
