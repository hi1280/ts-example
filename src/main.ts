#!/usr/bin/env node
import axios from 'axios';
import elasticsearch from 'elasticsearch';
import redis from 'redis';
import { promisify } from 'util';
import { Qiita } from './qiita';

const esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

export async function main() {
  const client = redis.createClient();
  const getAsync = promisify(client.get).bind(client);
  const items = (await getAsync('items')) as any;
  if (items) {
    return JSON.parse(items);
  } else {
    const res = await axios.get<Qiita[]>('https://qiita.com/api/v2/items');
    client.set('items', JSON.stringify(res.data), 'EX', 60);
    const body: Array<{}> = [];
    res.data.forEach(d => {
      body.push({
        index: {
          _id: d.id,
        },
      });
      body.push(d);
    });
    esclient.bulk({
      body,
      index: 'qiita',
      type: 'items',
    });
    return res.data;
  }
}

if (require.main === module) {
  main();
}
