import { Router } from 'express';
import { handleError } from '../lib/error-handler';

export const bindModelActions = model => {
  const Model = model;
  const ModelRouter = Router({ mergeParams: true });

  ModelRouter.route('/healthcheck')
    .get((req, res) => {
      res.send({
        status: 'OK',
        statusCode: 200
      });
    });

  ModelRouter.route('/')
    .get((req, res) => {
      Model
        .find()
        .then(data => {
          const response = { data, error: false };
          res.json(response);
        })
        .catch(err => handleError(err, res));
    })
    .post((req, res) => {
      Model
        .insert(req.body)
        .then(data => {
          res.json({ data, error: false })
        })
        .catch(err => handleError(err, res));
    });

  ModelRouter.route('/:id')
    .get((req, res) => {
      Model
        .find({ _id: req.params.id })
        .then(data => {
          const response = { data, error: false };
          res.json(response);
        })
        .catch(err => handleError(err, res));
    })
    .put((req, res) => {
      Model
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(data => {
          const response = { data, error: false };
          res.json(response);
        })
        .catch(err => handleError(err, res));
    })
    .delete((req, res) => {
      Model
        .remove({ _id: req.params.id })
        .then(data => {
          const response = { data, error: false };
          res.json(response);
        })
        .catch(err => handleError(err, res));
    });

    return ModelRouter;
};