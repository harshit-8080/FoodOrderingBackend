const OperationsController = require("../../controllers/operation.controller");
const OperationsService = require("../../services/operation.service");

jest.mock("../../services/operation.service");

test("should return name", async () => {
  const data = {
    name: "Harshit Raj",
  };

  const spy = jest
    .spyOn(OperationsService, "getName")
    .mockImplementation(() => {
      return { ...data, country: "India" };
    });

  const response = await OperationsController.getName();

  expect(spy).toHaveBeenCalled();
  expect(response).toStrictEqual(data);
});

test("should return age", async () => {
  const data = {
    age: "24",
  };

  const spy = jest.spyOn(OperationsService, "getAge").mockImplementation(() => {
    return { ...data, country: "India" };
  });

  const response = await OperationsController.getAge();

  expect(spy).toHaveBeenCalled();
  expect(response).toStrictEqual(data);
});

test("should return city", async () => {
  const data = {
    city: "Hyderabad",
  };

  const spy = jest
    .spyOn(OperationsService, "getCity")
    .mockImplementation(() => {
      return { ...data, country: "India" };
    });

  const response = await OperationsController.getCity();

  expect(spy).toHaveBeenCalled();
  expect(response).toStrictEqual(data);
});

test("should set my name ", async () => {
  const data = {
    name: "Manikesh",
  };

  const spy = jest
    .spyOn(OperationsService, "setMyName")
    .mockImplementation(() => {
      return data;
    });

  const response = await OperationsController.setMyName("Manikesh");

  expect(spy).toHaveBeenCalled();
  expect(response).toStrictEqual(data);
});

/**
 * 
❯ npx jest --coverage
PASS  tests/controllers/operation.test.js
PASS  tests/services/dummy.test.js
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |      76 |      100 |      50 |      76 |                   
 controllers              |     100 |      100 |     100 |     100 |                   
  operation.controller.js |     100 |      100 |     100 |     100 |                   
 services                 |      60 |      100 |   16.66 |      60 |                   
  dummy-services.js       |     100 |      100 |     100 |     100 |                   
  helper.js               |   33.33 |      100 |       0 |   33.33 | 2-4               
  operation.service.js    |      20 |      100 |       0 |      20 | 3-21              
--------------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.219 s, estimated 1 s
Ran all test suites.


 */
