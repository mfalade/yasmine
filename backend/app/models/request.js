import { bindModelActions } from './loki';

const RequestModel = db => {
  // const Model = db.get('requests');
  const Model = db.addCollection('requests', { indices: [] });
  return bindModelActions(Model)
};

export default RequestModel;