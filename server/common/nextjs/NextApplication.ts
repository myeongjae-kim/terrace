import { injectable } from 'inversify';
import next from 'next';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const preparedApp = app.prepare();

@injectable()
export class NextApplication {
  public handle = app.getRequestHandler();

  public render: typeof app.render = (...args) => app.render(...args)
  public run = () => preparedApp;
}