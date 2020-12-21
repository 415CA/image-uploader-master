import axios from 'axios';
import 'dotenv/config';
import { Router } from 'express';

const router = Router();

const API_KEY = process.env.OMDB_API_KEY; 
const COOKIE = process.env.COOKIE;


router.get('/:search', async (request, response) => {
  let config = {
    method: 'get',
    url: `http://www.omdbapi.com/?apikey=${API_KEY}&s=${request.params.search}&r=json`,
    headers: { 
      'Cookie': `${COOKIE}`
    }
  };

  axios(config)
    .then((films) => {
      response.send(films.data.Search);
    })
    .catch((error) => {
      response.send(error);
    });
});

export default router;
