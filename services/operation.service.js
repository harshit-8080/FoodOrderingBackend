class OperationsService {
  async getName() {
    return {
      name: "Harshit Raj",
      country: "India",
    };
  }
  async getAge() {
    return {
      age: "24",
      country: "India",
    };
  }
  async getCity() {
    return {
      city: "Hyderabad",
      country: "India",
    };
  }
}

module.exports = new OperationsService();
