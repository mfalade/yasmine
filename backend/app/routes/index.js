import { Router } from 'express';
import monk from 'monk';

import UserModel from '../models/user';
import RequestModel from '../models/request';
import config from '../config';

const db = monk(config.MONGO_DB_URI, { collectionOptions: { castIds: false } });
const AppRouter = Router();

AppRouter.use('/users', UserModel(db));
AppRouter.use('/requests', RequestModel(db));

export default AppRouter;