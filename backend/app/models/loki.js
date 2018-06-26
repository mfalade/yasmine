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
      const data = Model.find();
      const response = { data, error: false };
      res.json(response);
    })
    .post((req, res) => {
      const data = Model.insert(req.body);
      res.json({ data, error: false })
    });

  ModelRouter.route('/:id')
    .get((req, res) => {
      const data = Model.get(+req.params.id);
      const response = { data, error: false };
      res.json(response);
    })
    .put((req, res) => {
      const instance = Model.get(+req.params.id);
      if (!instance) {
        return res.send(404).json({
          error: true,
          message: 'Model not found'
        });
      }

      Object.entries(req.body).forEach(([key, value]) => {
        if (!key.includes('loki')) {
          instance[key] = value;
        }
      });

      const data = Model.update(instance);
      const response = { data, error: false };
      res.json(response);
    })
    .delete((req, res) => {
      const instance = Model.get(+req.params.id);
      const data = Model.remove(instance);
      const response = { data, error: false };
      res.json(response);
    });

    return ModelRouter;
};