// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./Project.sol";

contract ProjectFactory {
    event NewProjectCreated(string name, uint256 minimalContribution, address creator);
    Project[] public deployedProjects;

    function createProject(string calldata name, uint minimalContribution) public {
        require(minimalContribution >= 0,
        "The minimal contribution cannot be negative.");

        Project newProject = new Project(msg.sender, name, minimalContribution);
        deployedProjects.push(newProject);

        emit NewProjectCreated(name, minimalContribution, msg.sender);
    }
}