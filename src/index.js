import cors from 'cors';
import 'dotenv/config';
import express from 'express';

// API Data 
import models from './models';
import routes from './routes';

// Port
const PORT = process.env.PORT; 

//Initialize Express
const app = express();

//Transform request.body Type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Cors
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Assign Pseudo Authenticated User ID 
// app.use((req, res, next) => {
//   req.context = {
//     models,
//     me: models.users[1],
//   };
  
//   next();
// });

// Modular REST Routes
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/omdb', routes.omdb)

// Enable App Server
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);