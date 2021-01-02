import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { models, sequelize } from './models';
import { v4 as uuidv4 } from 'uuid';

// API Data 
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

// Assign Pseudo Authenticated User ID 
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('bignest')
  };
  next();
});

// REST Routes
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// Redirect Error Route 
app.get('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );
  error.statusCode = 301;

  next(error);
});

// Error Route
app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  
  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

// Enable App Server
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'bignest',
      messages: [
        {
          text: 'barbershop is open for business'
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'coronarona',
      messages: [
        {
          text: 'hold up buddy, not so fast'
        },
        {
          text: 'put that on pause for now'
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};