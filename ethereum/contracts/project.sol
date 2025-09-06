// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.30;



contract Project {
    struct Task {
        string description;
        uint256 reward;
        uint256 numberOfApprovals;
        bytes32 id;
        bool approved;
        bool completed;
        mapping(address => bool) approvers;
    }

    string public name;

    address private creator;
    uint private minimalContribution;
    uint256 private numberOfTasks;
    uint256 private numberOfParticipants;
    uint64 private nonce;

    mapping(address => bool) public participants;
    mapping(uint256 => Task) public tasks;
    mapping(bytes32 => Task) public tasksById;

    modifier restrictedToParticipantAndCreator() {
        require(participants[msg.sender] || msg.sender == creator,
            "You are not a participiants of this project.");
        
        _;
    }

    modifier restrictedToCreator() {
        require(msg.sender == creator,
            "Only creator can perform this action.");

        _;
    }

    constructor(address _creator, string memory _name, uint _minimalContribution) {
        creator = _creator;
        name = _name;
        minimalContribution = _minimalContribution;
    }

    function joinProject() public payable {
        require(msg.value >= minimalContribution,
            "Your contribution is to low to participate to this project.");

        participants[msg.sender] = true;
        numberOfParticipants++;
    }

    function createTask(string calldata description, uint256 reward) public restrictedToParticipantAndCreator {
        Task storage t = tasks[numberOfTasks++];
        t.description = description;
        t.reward = reward;
        t.approved = false;
        t.numberOfApprovals = 0;

        uint256 salt =
            uint256(
                keccak256(
                    abi.encodePacked(block.prevrandao, block.timestamp, nonce, msg.sender)
                )
            );

        bytes32 id = keccak256(abi.encodePacked(msg.sender, name, salt));

        t.id = id;
    }

    function approveTask(uint256 taskNumber) public restrictedToParticipantAndCreator {
        Task storage task = tasks[taskNumber];
        require(!task.approvers[msg.sender],
            "User already approve this task.");
        require(!task.completed,
            "task already completed.");

        task.numberOfApprovals++;
        task.approvers[msg.sender] = true;

        if (task.numberOfApprovals > numberOfParticipants / 2) {
            task.approved = true;
        }
    }
}