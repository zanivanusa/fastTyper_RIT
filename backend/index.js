import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('FastTyper backend test');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});