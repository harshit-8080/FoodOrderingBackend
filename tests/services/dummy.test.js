const { execute } = require("../../services/dummy-services");

test("adds 1 + 2 to equal 3", () => {
  const result = execute();
  expect(result).toBe("NODE");
});
