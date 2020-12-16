import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT; 

const app = express();

app.use(cors());

app.get('/', (request, response) => {
  return response.send('Received a GET HTTP method');
});

app.post('/', (request, response) => {
  return response.send('Received a POST HTTP method');
});

app.put('/', (request, response) => {
  return response.send('Received a PUT HTTP method');
});

app.delete('/', (request, response) => {
  return response.send('Received a DELETE HTTP method');
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);