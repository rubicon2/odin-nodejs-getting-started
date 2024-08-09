const express = require('express');

const app = express();
app.listen(8080);

app.get('/', (req, res) => {
  res.sendFile('./pages/index.html', { root: __dirname });
});

app.get('/turnips', (req, res) => {
  res.sendFile('./pages/turnips.html', { root: __dirname });
});

// Only runs if none of the other get requests match.
app.use((req, res) => {
  res.status(404).sendFile('./pages/missing.html', { root: __dirname });
});
