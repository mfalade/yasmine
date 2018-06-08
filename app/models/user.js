import { bindModelActions } from './base';

const UserModel = db => {
  const Model = db.get('users');  
  return bindModelActions(Model)
};

export default UserModel;