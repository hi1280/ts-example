import assert = require('assert');
import axios from 'axios';
import sinon from 'sinon';
import { get } from '../src/main';

describe('main()', () => {
  it('assert response', async () => {
    const resolved = Promise.resolve<any>({
      data: new Array(20),
    });
    sinon.stub(axios, 'get').returns(resolved);
    const res = await get();
    assert(res.data.length === 20);
  });
});
