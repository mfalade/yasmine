import { bindModelActions } from './base';

const RequestModel = db => {
  const Model = db.get('requests');  
  return bindModelActions(Model)
};

export default RequestModel;