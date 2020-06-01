import { BindToServerPipe } from './bindToServer.pipe';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {
  it('should create the app', () => {
    const bindToServerPipe = new BindToServerPipe();
    expect(bindToServerPipe.transform('string')).toEqual(
      environment.DataBaseUrl + 'string'
    );
  });
});
