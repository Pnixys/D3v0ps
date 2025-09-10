const { assert } = require("console");

const ProjectFactory = artifacts.require("ProjectFactory");
const Project = artifacts.require("Project");

contract("ProjectFactory", () => {
    let accounts;
    let project;

    before(async () => {
        accounts = await web3.eth.getAccounts();
        project = await Project.deployed(accounts[0], "Project test", 20);
    });

    it("Project Factory deployed", async function () {
        await ProjectFactory.deployed();
        return assert.equal(true,true, "oui");
    });

    it("Create Task", async function () {
        // await web3.eth.sendTransaction({
        //     from: accounts[0],
        //     to: project.address,
        //     value: 50
        // })
        // .On("error", function(){
        //     return assert.True(true);
        // });
        // await project.createTask("New task", "description", 20, { from: accounts[0]});
        let balance = await web3.eth.getBalance(project.address);
        assert.equal(balance, 50);

        // Assuming tasks is a public array and there's a getter for tasks
        const task = await project.tasks(0);
        assert.equal(task.title, "New task");
        assert.equal(task.description, "description");
        assert.equal(task.amount.toNumber(), 20);
    });
});
