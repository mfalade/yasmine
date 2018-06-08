import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AppRouter from './routes';

const PORT = process.env.PORT || 3001;

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
router.use('/api/v1', AppRouter);
app.use(router);

app.listen(PORT, () => {
  console.log(`App started on PORT ${PORT}`);
});