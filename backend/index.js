import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('FastTyper backend test');
});

app.get('/text', (req, res) => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliqu';
  return res.json({ text });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});