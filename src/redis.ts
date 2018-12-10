import redis from 'redis';
const client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on('error', (err: any) => {
  console.log('Error ' + err);
});

client.set('string key', 'string val', redis.print);
client.hset('hash key', 'hashtest 1', 'some value', redis.print);
client.hset('hash key', 'hashtest 2', 'some other value', redis.print);
client.hkeys('hash key', (_, replies: any) => {
  console.log(replies.length + ' replies:');
  replies.forEach((reply: any, i: any) => {
    console.log('    ' + i + ': ' + reply);
  });
  client.quit();
});
