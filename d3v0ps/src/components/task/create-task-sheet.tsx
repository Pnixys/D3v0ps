"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useState } from "react"
import { Plus } from "lucide-react"

interface CreateTaskSheetProps {
    projectId: string
    onTaskCreated?: (taskData: {
        title: string
        description: string
        reward: string
    }) => void
}

export default function CreateTaskSheet({ projectId, onTaskCreated }: CreateTaskSheetProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [reward, setReward] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = () => {
        if (!description || !reward || !title) return

        // Here you would normally call a blockchain function to create the task
        console.log("Creating task:", { title, projectId, description, reward})

        if (onTaskCreated) {
            onTaskCreated({ title, description, reward })
        }

        // Reset form and close sheet
        setDescription("")
        setReward("")
        setTitle("")
        setIsOpen(false)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button id="create-task-button" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Task
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Create a new Task</SheetTitle>
                    <SheetDescription>
                        Create a task with a description and reward.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                    <div className="grid gap-2">
                        <Label htmlFor="task-title">Task title</Label>
                        <Input
                            id="task-title"
                            type="text"
                            placeholder="Implement feature X"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="task-description">Task description</Label>
                        <Input
                            id="task-description"
                            type="text"
                            placeholder="Implement feature X"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="reward">
                            Reward
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Badge className="ml-2 h-5 min-w-3 rounded-full font-mono">?</Badge>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p>The reward is the amount received by the doer that will take the task.</p>
                                </HoverCardContent>
                            </HoverCard>
                        </Label>
                        <Input
                            id="reward"
                            type="text"
                            placeholder="1.5"
                            value={reward}
                            onChange={(e) => setReward(e.target.value)}
                            required
                        />
                        <span className="text-sm text-muted-foreground">ETH amount for task completion</span>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button onClick={handleSubmit}>Create Task</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
