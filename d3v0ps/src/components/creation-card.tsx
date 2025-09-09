import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent
} from "@/components/ui/hover-card"

interface CreationCardProps {
    isProject: boolean
}

export default function CreationCard({ isProject = true }: CreationCardProps) {
    const baseWord = isProject ? "Project" : "Task";
    const cardDescription = isProject ? "minimal amount" : "reward";
    const amountDescription = isProject ?
    "The minimal amount represent the amount that user must give to join the project" :
    "The reward is the amount received by the doer that will take the task.";
    return (
        <Card className="w-full max-w-2xl md:w-2/3">
            <CardHeader>
                <CardTitle>Create a new {baseWord}</CardTitle>
                <CardDescription>
                    Create a {baseWord} with a title, a description and a {cardDescription}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="project-name">{baseWord} name</Label>
                            <Input
                                id="project-name"
                                type="text"
                                placeholder="Your project name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">{baseWord} description</Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Your description"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="min-amount">
                                {cardDescription}
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <Badge className="h-5 min-w-3 rounded-full font-mono">?</Badge>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <p>{amountDescription}</p>
                                    </HoverCardContent>
                                </HoverCard>
                            </Label>
                            <Input  
                                id="min-amount"
                                type="text"
                                placeholder="10"
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}