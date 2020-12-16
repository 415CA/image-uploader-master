import 'dotenv/config';
import cors from 'cors';
import express from 'express';

// API Data 
import users from './Users';
import messages from './Messages';

// Port
const PORT = process.env.PORT; 

//Initialize Express
const app = express();

// Enable Cors
app.use(cors());

// RESTful Routes
app.get('/users', (request, response) => {
  return response.send(Object.values(users));
});

app.get('/users/:userId', (request, response) => {
  return response.send(users[request.params.userId]);
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

app.get('/messages', (request, response) => {
  return response.send(Object.values(messages));
});

app.get('/messages/:messageId', (request, response) => {
  return response.send(messages[request.params.messageId]);
});

// Enable App Server
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);