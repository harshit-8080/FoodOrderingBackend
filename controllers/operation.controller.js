const OperationsService = require("../services/operation.service");

class OperationsController {
  async getName() {
    const response = await OperationsService.getName();
    return {
      name: response.name,
    };
  }
  async getAge() {
    const response = await OperationsService.getAge();
    return {
      age: response.age,
    };
  }
  async getCity() {
    const response = await OperationsService.getCity();
    return {
      city: response.city,
    };
  }
}

module.exports = new OperationsController();
