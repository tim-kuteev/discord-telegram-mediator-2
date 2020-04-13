export interface Plugin {
  init(): Promise<void>;
}
