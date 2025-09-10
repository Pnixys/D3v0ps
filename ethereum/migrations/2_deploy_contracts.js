const ProjectFactory = artifacts.require("ProjectFactory");
const Project = artifacts.require("Project");

module.exports = function (deployer, network, accounts) {
    // deployment steps
    deployer.deploy(ProjectFactory)
        .then(() => {
            console.log("ProjectFactory deployed successfully");
        })
        .catch((error) => {
            console.error("Deployment failed:", error);
        });

    deployer.deploy(Project, accounts[0], "Test Project", 20)
        .then(() => {
            console.log("Project deployed successfully");
        })
        .catch((error) => {
            console.error("Deployment failed:", error);
        });
};