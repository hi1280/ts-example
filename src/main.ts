import axios from 'axios';
import elasticsearch from 'elasticsearch';
import redis from 'redis';
import { promisify } from 'util';
import { Qiita } from './qiita';

const esclient = new elasticsearch.Client({
  host: `${process.env.ES_HOST}:${process.env.ES_PORT}`,
});

export async function main() {
  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!, 10),
  });
  const getAsync = promisify(client.get).bind(client);
  const items = await getAsync('items');
  let returned = null;
  if (items) {
    returned = JSON.parse(items);
  } else {
    const res = await get();
    client.set('items', JSON.stringify(res.data), 'EX', 1800);
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
    returned = res.data;
  }
  client.quit();
  return returned;
}

export function get() {
  return axios.get<Qiita[]>('https://qiita.com/api/v2/items');
}

if (require.main === module) {
  main().then(res => {
    console.log(res);
  });
}
