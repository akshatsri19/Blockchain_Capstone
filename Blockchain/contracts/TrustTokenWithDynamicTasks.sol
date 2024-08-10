// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrustTokenWithDynamicTasks is ERC20, Ownable {
    // Struct to store task details
    struct Task {
        uint256 rewardAmount;
        bool isActive;
    }

    // Mapping to store tasks (taskId => Task struct)
    mapping(uint256 => Task) public tasks;

    // Mapping to track task completion by users (hashedKycId => taskId => bool)
    mapping(bytes32 => mapping(uint256 => bool)) public taskCompletion;

    event RewardClaimed(address indexed user, bytes32 indexed hashedKycId, uint256 indexed taskId, uint256 rewardAmount);
    event TaskAdded(uint256 indexed taskId, uint256 rewardAmount);
    event TaskUpdated(uint256 indexed taskId, uint256 newRewardAmount, bool isActive);

    constructor() ERC20("TrustToken", "TRUST") Ownable(msg.sender) {
        _mint(address(this), 100000 * 10 ** 18); // Initial mint for rewards pool
    }

    // Function to add a new task or update an existing task
    function addOrUpdateTask(uint256 taskId, uint256 rewardAmount, bool isActive) external onlyOwner {
        tasks[taskId] = Task({
            rewardAmount: rewardAmount,
            isActive: isActive
        });

        if (isActive) {
            emit TaskAdded(taskId, rewardAmount);
        } else {
            emit TaskUpdated(taskId, rewardAmount, isActive);
        }
    }

    // Function for users to claim their reward after completing a task
    function claimReward(bytes32 hashedKycId, uint256 taskId) external {
        require(tasks[taskId].isActive, "Task is not active");
        require(!taskCompletion[hashedKycId][taskId], "Task already completed by this KYC ID");
        require(balanceOf(address(this)) >= tasks[taskId].rewardAmount, "Not enough tokens in rewards pool");

        // Mark the task as completed for the user with the given hashed KYC ID
        taskCompletion[hashedKycId][taskId] = true;

        // Transfer the reward to the user based on the task performed
        _transfer(address(this), msg.sender, tasks[taskId].rewardAmount);

        emit RewardClaimed(msg.sender, hashedKycId, taskId, tasks[taskId].rewardAmount);
    }

    // Function to batch reward users manually if needed (only by the owner)
    function batchRewardUsers(bytes32[] calldata hashedKycIds, uint256[] calldata taskIds, address[] calldata recipients) external onlyOwner {
        require(hashedKycIds.length == taskIds.length, "KYC IDs and task IDs length mismatch");
        require(hashedKycIds.length == recipients.length, "KYC IDs and recipients length mismatch");

        for (uint256 i = 0; i < hashedKycIds.length; i++) {
            _reward(hashedKycIds[i], taskIds[i], recipients[i]);
        }
    }

    // Internal function to handle rewards
    function _reward(bytes32 hashedKycId, uint256 taskId, address recipient) internal {
        require(tasks[taskId].isActive, "Task is not active");
        require(!taskCompletion[hashedKycId][taskId], "Task already completed by this KYC ID");
        require(balanceOf(address(this)) >= tasks[taskId].rewardAmount, "Not enough tokens in rewards pool");

        taskCompletion[hashedKycId][taskId] = true;
        _transfer(address(this), recipient, tasks[taskId].rewardAmount);
        emit RewardClaimed(recipient, hashedKycId, taskId, tasks[taskId].rewardAmount);
    }
}