"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCent } from "lucide-react";

export type TaskStatus = 'waiting_approval' | 'on_the_way' | 'doing' | 'completed';

export interface TaskCardProps {
    id: number;
    title: string;
    description: string;
    reward: string;
    approvals: number;
    totalParticipants: number;
    status: TaskStatus;
    onApprove?: (taskId: number) => void;
    onStatusChange?: (taskId: number, newStatus: TaskStatus) => void;
}

export default function TaskCard({
    id,
    title,
    description,
    reward,
    approvals,
    totalParticipants,
    status,
    onApprove,
    onStatusChange,
}: TaskCardProps) {
    // Get the appropriate styling for the status badge
    const getStatusBadgeStyle = () => {
        switch (status) {
            case 'waiting_approval':
                return { variant: 'outline' as const, label: 'Waiting Approval' };
            case 'on_the_way':
                return { variant: 'secondary' as const, label: 'On the Way' };
            case 'doing':
                return { variant: 'default' as const, label: 'Doing' };
            case 'completed':
                return { variant: 'success' as const, label: 'Completed' };
        }
    };

    const statusBadge = getStatusBadgeStyle();
    const isCompleted = status === 'completed';

    return (
        <Card className={isCompleted ? "bg-muted/50" : ""}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">#{id}: {title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <BadgeCent className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{reward} ETH reward</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Approvals: {approvals}/{totalParticipants}
                    </span>
                </div>
                <div className="flex gap-2">
                    {statusBadge.variant === 'success' ? (
                        <Badge className="bg-green-500">{statusBadge.label}</Badge>
                    ) : statusBadge.variant === 'secondary' ? (
                        <Badge variant="secondary">{statusBadge.label}</Badge>
                    ) : statusBadge.variant === 'outline' ? (
                        <Badge variant="outline">{statusBadge.label}</Badge>
                    ) : (
                        <Badge>{statusBadge.label}</Badge>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
