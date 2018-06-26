import { bindModelActions } from './loki';

const UserModel = db => {
  // const Model = db.get('users');  
  const Model = db.addCollection('users', { indices: [] });
  return bindModelActions(Model)
};

export default UserModel;