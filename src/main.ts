#!/usr/bin/env node
import axios from 'axios';
import redis from 'redis';
import { promisify } from 'util';
import { Qiita } from './qiita';

export async function main() {
  const client = redis.createClient();
  const getAsync = promisify(client.get).bind(client);
  let res = (await getAsync('items')) as any;
  if (res) {
    return JSON.parse(res);
  } else {
    res = await axios.get<Qiita[]>('https://qiita.com/api/v2/items');
    client.set('items', JSON.stringify(res.data), 'EX', 60);
    return res.data;
  }
}

if (require.main === module) {
  main();
}
