import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT; 

const app = express();

app.use(cors());

app.get('/users', (request, response) => {
  return response.send('Received a GET HTTP method on user resource');
});

app.post('/users', (request, response) => {
  return response.send('Received a POST HTTP method on user resource');
});

app.put('/users/:userID', (request, response) => {
  return response.send(
    `Received a PUT HTTP method on user/${request.params.userID} resource`
  );
});

app.delete('/users/:userID', (request, response) => {
  return response.send(
    `Received a DELETE HTTP method on user/${request.params.userID} resource`
  );
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);