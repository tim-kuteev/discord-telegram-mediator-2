import { ContextMessageUpdate } from 'telegraf';

export interface TelegramCommand {

  readonly name: string;
  readonly description: string;

  action(ctx: ContextMessageUpdate): void;
}
