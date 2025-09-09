import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
    const ProjectFactory = await ethers.getContractFactory("ProjectFactory");
    const projectFactory = await ProjectFactory.deploy();
    await projectFactory.deployed();
    console.log("ProjectFactory deployed to:", projectFactory.address);

    const Project = await ethers.getContractFactory("Project");
    const project = await Project.deploy();
    await project.deployed();
    console.log("Project deployed to:", project.address);

    const ReentrancyGuard = await ethers.getContractFactory("ReentrancyGuard");
    const reentrancyGuard = await ReentrancyGuard.deploy();
    await reentrancyGuard.deployed();
    console.log("ReentrancyGuard deployed to:", reentrancyGuard.address);

    const contracts = [
        { name: "ProjectFactory", address: projectFactory.address },
        { name: "Project", address: project.address },
        { name: "ReentrancyGuard", address: reentrancyGuard.address }
    ];

    const dest = path.resolve(__dirname, `../contract-data/contracts.json`);
    fs.writeFileSync(dest, JSON.stringify(contracts, null, 2));
    console.log("Contract addresses exported to contract-data.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });