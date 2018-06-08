import { Router } from 'express';
import monk from 'monk';

import UserModel from '../models/user';
import RequestModel from '../models/request';

const db = monk('mongodb://yasmine:yazz@ds159129.mlab.com:59129/yazz');
const AppRouter = Router();

AppRouter.use('/users', UserModel(db));
AppRouter.use('/requests', RequestModel(db));

export default AppRouter;