"use client";

import { BadgeCent, Layers, Users, Plus } from "lucide-react";
import TaskCard from "@/components/task/task-card";
import CreateTaskSheet from "@/components/task/create-task-sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock data for a single project - in real app, this would come from blockchain
const projectData = {
    id: "0x1234567890abcdef",
    title: "Decentralized Exchange Platform",
    description: "Building a high-performance DEX with low gas fees and cross-chain capabilities for DeFi enthusiasts. This project aims to revolutionize how assets are traded across different blockchains with minimal slippage and maximum security.",
    minContribution: "0.5",
    balance: "12.35",
    participantsCount: 12,
    creatorName: "0xEtherDev",
    creatorAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    tasks: [
        { 
            id: 1,
            title: "Cross-chain bridge", 
            description: "Implement cross-chain bridge functionality", 
            reward: "2.5",
            approvals: 8,
            status: 'on_the_way'
        },
        { 
            id: 2, 
            title: "ERC-1155 support",
            description: "Add support for ERC-1155 tokens", 
            reward: "1.2",
            approvals: 10,
            status: 'completed'
        },
        { 
            id: 3,
            title: "Optimize gas", 
            description: "Optimize gas usage for swaps", 
            reward: "3.0",
            approvals: 6,
            status: 'waiting_approval'
        },
        { 
            id: 4, 
            title: "Transaction batching",
            description: "Implement transaction batching for lower fees", 
            reward: "1.8",
            approvals: 9,
            status: 'doing'
        },
    ]
};

export default function Project() {
    // Use state to manage tasks so we can add to them
    const [tasks, setTasks] = useState(projectData.tasks);

    const handleTaskCreated = (taskData: { title: string; description: string; reward: string }) => {
        console.log("Task created:", taskData);
        
        // Create a new task with the next ID and waiting approval status
        const newTask = {
            id: tasks.length + 1,
            title: taskData.title,
            description: taskData.description,
            reward: taskData.reward,
            approvals: 0,
            status: 'waiting_approval' as 'waiting_approval' | 'on_the_way' | 'doing' | 'completed'
        };
        
        // Add the new task to the tasks list
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="container py-10">
            {/* Project Header Section */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold">{projectData.title}</h1>
                    <p className="text-muted-foreground mt-2 max-w-3xl">{projectData.description}</p>
                    
                    <div className="flex flex-wrap gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <BadgeCent className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">
                                {projectData.minContribution} ETH min. contribution
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">
                                {projectData.participantsCount} participants
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Created by</p>
                        <p className="font-medium">{projectData.creatorName}</p>
                        <p className="text-sm text-muted-foreground break-all">{projectData.creatorAddress}</p>
                    </div>
                </div>
                
                <div className="bg-muted p-6 rounded-lg min-w-[200px]">
                    <p className="text-sm text-muted-foreground">Project Balance</p>
                    <p className="text-2xl font-bold">{projectData.balance} ETH</p>
                </div>
            </div>
            
            {/* Tasks Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        <h2 className="text-2xl font-semibold">Tasks</h2>
                    </div>
                    <div className="flex items-center">
                        <CreateTaskSheet 
                            projectId={projectData.id}
                            onTaskCreated={handleTaskCreated}
                        />
                    </div>
                </div>
                
                {/* Task Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <TaskCard 
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            reward={task.reward}
                            approvals={task.approvals}
                            totalParticipants={projectData.participantsCount}
                            status={task.status as 'waiting_approval' | 'on_the_way' | 'doing' | 'completed'}
                            onApprove={(id) => console.log(`Approve task ${id}`)}
                            onStatusChange={(id, newStatus) => console.log(`Change task ${id} status to ${newStatus}`)}
                        />
                    ))}
                    
                    {/* Add Task Card Button */}
                    <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 bg-muted/30 hover:bg-muted/50 transition-colors">
                        <Button onClick={() => document.getElementById('create-task-button')?.click()} variant="outline" className="gap-2">
                            <Plus className="h-5 w-5" />
                            Create New Task
                        </Button>
                    </div>
                    
                    {tasks.length === 0 && (
                        <div className="col-span-full flex justify-center items-center h-40 bg-muted/30 rounded-lg">
                            <p className="text-muted-foreground">No tasks created yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}