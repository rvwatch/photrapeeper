const express = require('express');
const app = express();

app.set('port', 3000);

app.use(express.static('public'))

app.listen(app.get('port'), () => {
  console.log(`Photrapeeper is listening on ${app.get('port')}!!`);
});

