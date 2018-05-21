const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const bodyParser = require('body-parser');


app.set('port', 3000);

app.use(express.static('public'))
app.use(bodyParser.json());

app.get('/api/v1/albums', (req, res) => {
  database('albums').select()
  .then((albums) => {
    res.status(200).json(albums);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
});

app.post('/api/v1/albums', (request, response) => {
  const photo = request.body;

  for (let requiredParameter of ['title', 'url']) {
    if (!photo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, url: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  database('albums').insert(photo, 'id')
    .then(photo => {
      response.status(201).json({ id: photo[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});


app.listen(app.get('port'), () => {
  console.log(`Photrapeeper is listening on ${app.get('port')}!!`);
});

