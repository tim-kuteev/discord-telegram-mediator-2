export interface Storage {

  read(key: string): Promise<any>;
  write(key: string, value: any): Promise<void>;
  invalidate(): void;
}
