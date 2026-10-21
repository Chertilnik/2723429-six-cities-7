import {ICommand} from './command.interface.js';
import {MockServerData} from '../shared/types/index.js';
import got from 'got';
import {TSVOfferGenerator} from '../shared/libs/offer-generator/index.js';
import {TSVFileWriter} from '../shared/libs/file-writer/index.js';
import {getErrorMessage} from '../shared/helpers/index.js';


export class GenerateCommand implements ICommand {
  private initialData: MockServerData;
  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Failed to load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }


  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]) {
    const [count, filepath, url] = parameters;
    if (parameters.length !== 3) {
      throw new Error('Usage: --generate <count> <filepath> <url>');
    }

    if (!count || !filepath || !url) {
      throw new Error('All parameters are required: count, filepath, url');
    }

    const offerCount = Number.parseInt(count, 10);
    if (Number.isNaN(offerCount)) {
      throw new Error(`OfferCount must be a number: ${offerCount}`);
    }

    try {
      new URL(url);
    } catch {
      throw new Error(`Invalid URL: ${url}`);
    }

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.log(`File ${filepath} created`);
    } catch (error: unknown) {
      console.error('Cant generate data');
      console.error(getErrorMessage(error));
    }
  }
}
