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
