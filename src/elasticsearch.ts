import elasticsearch from 'elasticsearch';
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

client.ping(
  {
    requestTimeout: 30000,
  },
  function(error: any) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  },
);

client.index({
  body: {
    text: 'Hello World!',
  },
  index: 'myindex',
  type: 'mytype',
});

client
  .search({
    body: {
      query: {
        match_all: {},
      },
    },
  })
  .then(
    function(resp: any) {
      const hits = resp.hits.hits;
    },
    function(err: any) {
      console.trace(err.message);
    },
  );
