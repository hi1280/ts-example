import assert = require('assert');
import axios from 'axios';
import sinon from 'sinon';
import { main } from '../src/main';

describe('main()', () => {
  it('assert response', async () => {
    const resolved = Promise.resolve<any>({
      data: new Array(20),
    });
    sinon.stub(axios, 'get').returns(resolved);
    const res = await main();
    assert(res.length === 20);
  });
});
