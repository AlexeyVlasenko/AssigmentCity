import Model from './Model';

export default class City extends Model {
  validate = () => {
    if (!this.id) {
      return false;
    }
    // other validations

    return true;
  }
}
