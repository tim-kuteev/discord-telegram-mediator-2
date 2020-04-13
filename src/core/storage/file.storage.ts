import * as path from 'path';
import { promises as fsp } from 'fs';
import { Storage } from './storage';
import { LoggerFactory } from '../logger/logger-factory';

const LINE_SPLITTER = /\r\n|[\n\v\f\r\x85\u2028\u2029]/;
const PAIR_SPLITTER = /=(.*)/;

const logger = LoggerFactory.get('file.storage');

export interface SimpleJson {
  [key: string]: any;
}

class AsyncQueue {

  private _flushing = false;
  private _queue: Promise<any>[] = [];

  async enqueue(action: Promise<any>) {
    this._queue.push(action);
    if (this._flushing) {
      return;
    }
    this._flushing = true;
    while (await (this._queue.shift()))
    this._flushing = false;
  }
}

export class FileStorage implements Storage {

  private readonly _filePath = path.join(__dirname, 'storage-file');
  private _cache: SimpleJson = {};
  private _queue = new AsyncQueue();

  async read(key: string): Promise<any> {
    if (key in this._cache) {
      return this._cache[key];
    }
    const data = await this._readFile();
    if (typeof data[key] === 'undefined' || data[key] === '') {
      return null;
    }
    return this._cache[key] = data[key];
  }

  async write(key: string, value: any = ''): Promise<void> {
    this._cache[key] = value;
    let data = await this._readFile();
    data = {...data, ...this._cache};
    await this._writeFile(data);
  }

  invalidate(): void {
    for (const prop in this._cache) {
      if (this._cache.hasOwnProperty(prop)) delete this._cache[prop];
    }
  }

  private async _readFile(): Promise<SimpleJson> {
    try {
      const fileContent = (await fsp.readFile(this._filePath, {encoding: 'utf8'})) as string;
      const lines = fileContent.split(LINE_SPLITTER);
      return lines
        .reduce((result: SimpleJson, line: string) => {
          const [lineKey, lineValue] = line.split(PAIR_SPLITTER);
          if (lineKey) {
            try {
              result[lineKey] = JSON.parse(lineValue);
            } catch (err) {
              logger.error('Parsing storage file: %O', err);
            }
          }
          return result;
        }, {});
    } catch (e) {
      if (e.code === 'ENOENT') {
        await this._writeQueue('');
        return {};
      }
      throw e;
    }
  }

  private async _writeFile(content: SimpleJson): Promise<void> {
    const data = Object.entries(content)
      .map(([key, value]) => `${key}=${JSON.stringify(value)}\n`)
      .join('');
    await this._writeQueue(data);
  }

  private async _writeQueue(data: string): Promise<void> {
    const promise = fsp.writeFile(this._filePath, data);
    await this._queue.enqueue(promise);
  }
}
