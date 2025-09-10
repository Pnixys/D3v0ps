const ProjectTest = artifacts.require("Project");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ProjectTest", function (/* accounts */) {
  it("should assert true", async function () {
    await ProjectTest.deployed();
    return assert.isTrue(true);
  });
});
