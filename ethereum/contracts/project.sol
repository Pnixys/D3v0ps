// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.30;

import "./ReentrancyGuard.sol";


contract Project is ReentrancyGuard {
    enum TaskStatus { WaitingApproval, OnTheWay, Doing, Completed }

    struct Task {
        uint256 number;
        string title;
        string description;
        uint256 reward;
        address payable doer;
        TaskStatus status;
        uint256 startApprovalCount;
        uint256 rewardApprovalCount;
        mapping(address => bool) hasApprovedStart;
        mapping(address => bool) hasApprovedReward;
        bool exist;
    }

    event NewTaskCreated(uint256 taskNumber, string title, uint256 reward);
    event TaskApproved(uint256 taskNumber, string title, uint256 reward);
    event TaskTaken(uint256 taskNumber, string title, address doer);
    event TaskCompleted(uint256 taskNumber, string title, address doer);
    event Received(address sender, uint256 amount);
    event DoerGetPaid();

    string public name;

    address private creator;
    uint private minimalContribution;
    uint256 private numberOfTasks = 0;
    uint256 private numberOfParticipants = 1;

    uint256 private waitingTasksCount = 0;
    uint256 private onTheWayTasksCount = 0;
    uint256 private doingTasksCount = 0;
    uint256 private completedTasksCount = 0;

    mapping(address => bool) public participants;
    mapping(uint256 => Task) public tasks;

    modifier participantOnly() {
        require(participants[msg.sender], "You are not a participants of this project.");
        
        _;
    }

    modifier creatorOnly() {
        require(msg.sender == creator, "Only creator can perform this action.");

        _;
    }

    modifier verifyTaskExist(uint256 taskNumber) {
        require(tasks[taskNumber].exist, "The asking task doesn't exist.");

        _;
    }

    modifier voteOnce(uint256 taskNumber, bool isStartStage) {
        Task storage task = tasks[taskNumber];

        if (isStartStage)
            require(!task.hasApprovedStart[msg.sender], "User already approve this task.");
        else 
            require(!task.hasApprovedReward[msg.sender], "User already approve this task.");

        _;
    }

    constructor(address _creator, string memory _name, uint _minimalContribution) {
        creator = _creator;
        name = _name;
        minimalContribution = _minimalContribution;
        participants[_creator] = true;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function joinProject() public payable {
        require(msg.sender != creator, "Creator can't join the project.");
        require(msg.value >= minimalContribution, "Your contribution is to low to participate to this project.");

        participants[msg.sender] = true;
        numberOfParticipants++;
    }

    function createTask(string calldata title, string calldata description, uint256 reward) public participantOnly {
        require(bytes(title).length <= 32, "Title too long. (32 char max)");
        require(address(this).balance >= reward, "Not enough balance to create this task.");
        require(reward != 0, "Reward can't be 0.");

        Task storage t = tasks[numberOfTasks];
        t.number = numberOfTasks++;
        t.title = title;
        t.description = description;
        t.reward = reward;
        t.startApprovalCount = t.rewardApprovalCount = 0;
        t.status = TaskStatus.WaitingApproval;
        t.exist = true;

        emit NewTaskCreated(t.number, t.title, t.reward);
    }

    function approveTaskStart(uint256 taskNumber) public participantOnly verifyTaskExist(taskNumber)  voteOnce(taskNumber, true) {
        Task storage task = tasks[taskNumber];
        task.startApprovalCount++;
        task.hasApprovedStart[msg.sender] = true;

        if (task.startApprovalCount > numberOfParticipants / 2) {
            task.status = TaskStatus.OnTheWay;
            
            emit TaskApproved(task.number, task.title, task.reward);
        }
    }

    function approveTaskCompleted(uint256 taskNumber) public participantOnly verifyTaskExist(taskNumber)  voteOnce(taskNumber, false) nonReentrant {
        Task storage task = tasks[taskNumber];

        require(task.status == TaskStatus.Doing, "Task must be in Doing status to be completed.");
        require(task.doer != address(0), "No doer assigned to this task.");
        require(address(this).balance >= task.reward, "Insufficient contract balance to pay reward.");


        task.rewardApprovalCount++;
        task.hasApprovedReward[msg.sender] = true;

        if (task.rewardApprovalCount > numberOfParticipants / 2) {
            task.status = TaskStatus.Completed;
            uint256 rewardAmount = task.reward;
            task.reward = 0;

            emit TaskCompleted(task.number, task.title, task.doer);

            (bool success, ) = task.doer.call{value: rewardAmount}("");
            require(success, "Reward transfer failed.");

            emit DoerGetPaid();
        }
    }

    function doerTakeTask(uint256 taskNumber) public verifyTaskExist(taskNumber) {
        Task storage task = tasks[taskNumber];

        require(task.status == TaskStatus.OnTheWay, "To be taken a task required OnTheWay status");
        require(task.doer == address(0), "Task already has a doer assigned.");

        task.doer = payable(msg.sender);
        task.status = TaskStatus.Doing;

        emit TaskTaken(task.number, task.title, task.doer);
    }
    
    function getProjectsMetrics() external view returns (
        string memory projectName,
        uint256 totalTasks,
        uint256 totalParticipants,
        uint256 contractBalance,
        address projectCreator) {
            
        return (name, numberOfTasks, numberOfParticipants, address(this).balance, creator);
    }

    function isParticipant(address user) external view returns (bool) {
        return participants[user] || user == creator;
    }

    function getActiveTasksCount() external view returns (uint256 waiting, uint256 onTheWay, uint256 doing, uint256 completed) {
        for (uint256 i = 0; i < numberOfTasks; i++) {
            if (tasks[i].exist) {
                if (tasks[i].status == TaskStatus.WaitingApproval) waiting++;
                else if (tasks[i].status == TaskStatus.OnTheWay) onTheWay++;
                else if (tasks[i].status == TaskStatus.Doing) doing++;
                else if (tasks[i].status == TaskStatus.Completed) completed++;
            }
        }
    }

    function getTaskDetails(uint256 taskNumber) external view verifyTaskExist(taskNumber) returns (
        string memory title,
        string memory description,
        uint256 reward,
        address doer,
        TaskStatus status,
        uint256 startApprovals,
        uint256 rewardApprovals,
        bool needsMoreApprovals
    ) {
        Task storage task = tasks[taskNumber];
        bool needsApproval = (task.status == TaskStatus.WaitingApproval && task.startApprovalCount <= numberOfParticipants / 2) ||
                            (task.status == TaskStatus.Doing && task.rewardApprovalCount <= numberOfParticipants / 2);
        
        return (
            task.title,
            task.description,
            task.reward,
            task.doer,
            task.status,
            task.startApprovalCount,
            task.rewardApprovalCount,
            needsApproval
        );
    }

    function _updateTaskCounter(TaskStatus oldStatus, TaskStatus newStatus) private {
        if (oldStatus == TaskStatus.WaitingApproval) waitingTasksCount--;
        else if (oldStatus == TaskStatus.OnTheWay) onTheWayTasksCount--;
        else if (oldStatus == TaskStatus.Doing) doingTasksCount--;
        else if (oldStatus == TaskStatus.Completed) completedTasksCount--;

        if (newStatus == TaskStatus.WaitingApproval) waitingTasksCount++;
        else if (newStatus == TaskStatus.OnTheWay) onTheWayTasksCount++;
        else if (newStatus == TaskStatus.Doing) doingTasksCount++;
        else if (newStatus == TaskStatus.Completed) completedTasksCount++;
    }
}