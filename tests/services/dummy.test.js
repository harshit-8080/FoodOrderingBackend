const dummyFunctions = require("../../services/dummy-services");

const { helper } = require("../../services/helper.js");

jest.mock("../../services/helper.js");

test("result is NODE", () => {
  helper.mockReturnValue(true);

  const result = dummyFunctions.execute();

  expect(result).toBe("NODE");
});

test("result is REACT", () => {
  helper.mockReturnValue(false);

  const result = dummyFunctions.execute();

  expect(result).toBe("REACT");
});


//! npx jest --coverage