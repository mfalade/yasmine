import { Router } from 'express';
import monk from 'monk';

const db = monk('mongodb://yasmine:yazz@ds159129.mlab.com:59129/yazz');
const Model = db.get('data');
const AppRouter = Router();

const handleError = (err, res) => {
  const response = { error: true, message: err };
  return res.status(400).json(response);
}

AppRouter.get('/healthcheck', (req, res) => {
  res.send({
    status: 'OK',
    statusCode: 200
  });
});

AppRouter.get('/data', (req, res) => {
  Model
    .find()
    .then(data => {
      const response = { data, error: false };
      res.json(response);
    })
    .catch(err => handleError(err, res));
});

AppRouter.get('/data/:id', (req, res) => {
  Model
    .find({ _id: req.params.id })
    .then(data => {
      const response = { data, error: false };
      res.json(response);
    })
    .catch(err => handleError(err, res));
});

AppRouter.put('/data/:id', (req, res) => {
  Model
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(data => {
      const response = { data, error: false };
      res.json(response);
    })
    .catch(err => handleError(err, res));
});

AppRouter.delete('/data/:id', (req, res) => {
  Model
    .remove({ _id: req.params.id })
    .then(data => {
      const response = { data, error: false };
      res.json(response);
    })
    .catch(err => handleError(err, res));
});

AppRouter.post('/data', (req, res) => {
  Model
    .insert(req.body)
    .then(data => {
      res.json({ data, error: false }) 
    })
    .catch(err => handleError(err, res));
});

export default AppRouter;