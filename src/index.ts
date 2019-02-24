// Express required Imports
import cors = require('cors');
import { config } from 'dotenv';
import * as express from 'express';
import logger = require('morgan');

config();

// DB required imports
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection({
  type: 'postgres',
  host: process.env.POSTGRES_URL,
  port: Number(process.env.POSTGRES_PORT),
  database: 'test3',
  entities: [User],
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  logging: false,
})
  .then(async connection => {
    // Everything here.
    const app = express();

    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: false }));

    app.get('*', (req, res, next) => {
      res.status(404).send({ message: 'Not Found' });
    });

    /* ****************************************
      //*              Listen
      ******************************************/
    const listenPort = process.env.PORT || 3000;
    app.listen(listenPort, () => {
      console.log(`Listening at port ${listenPort}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
