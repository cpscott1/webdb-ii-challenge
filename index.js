const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true,
}

const db = knex(knexConfig);

server.use(express.json());
server.use(helmet());

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => {
    console.log(err);
  })
})

server.post('/api/zoos', (req, res) => {
  db('zoos')
  .insert(req.body, 'id')
  .then(results =. {
    res.status(200).json(results);
  })
  .catch(err => {
    res.sstatus(500).json(err);
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
