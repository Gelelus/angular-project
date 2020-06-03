import { BindToServerPipe } from './bindToServer.pipe';
import { environment } from 'src/environments/environment';

describe('BindToServerPipe', () => {
  it('should create string with DataBaseUrl', () => {
    const bindToServerPipe = new BindToServerPipe();
    expect(bindToServerPipe.transform('string')).toEqual(
      environment.DataBaseUrl + 'string'
    );
  });
});
