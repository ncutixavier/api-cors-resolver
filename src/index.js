import express from 'express';
import bodyParser from 'body-parser';
import SwaggerUiOptions from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoute from './routes/UserRoute'
import DeezerRoute from './routes/DeezerRoutes'
import CoinMarketRoute from './routes/CoinMarketRoute'

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome!',
  });
});

app.use(
  '/api-docs',
  SwaggerUiOptions.serve,
  SwaggerUiOptions.setup(swaggerDocument)
);
app.use('/api/v1/users', UserRoute)
app.use('/api/v1/deezer', DeezerRoute)
app.use('/api/v1/coinmarket', CoinMarketRoute)

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected✔️'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

export default app;
