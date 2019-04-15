export default class Model {
  constructor(data) {
    Object.assign(this, data);
    this.validate();
  }

  validate = () => true;
}
