import { ContextMessageUpdate } from 'telegraf';

export interface TelegramEvent {

  readonly name: string;

  action(ctx: ContextMessageUpdate): void;
}
