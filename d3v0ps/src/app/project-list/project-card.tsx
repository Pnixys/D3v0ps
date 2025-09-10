import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCent, Users } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    minContribution: string; // ETH amount as string (e.g. "0.05")
    participantsCount: number;
    creatorName: string;
}

export default function ProjectCard({
    title,
    description,
    minContribution,
    participantsCount,
    creatorName,
}: ProjectCardProps) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="line-clamp-2">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <BadgeCent className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                            {minContribution} ETH min. contribution
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                            {participantsCount} {participantsCount === 1 ? "participant" : "participants"}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                <div>
                    <p className="text-xs text-muted-foreground">Created by</p>
                    <p className="text-sm font-medium truncate max-w-[200px]">{creatorName}</p>
                </div>
            </CardFooter>
        </Card>
    );
}