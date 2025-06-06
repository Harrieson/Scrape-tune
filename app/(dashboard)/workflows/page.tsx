import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { waitFor } from '@/lib/helper/waitFor'
import { Collapsible } from '@radix-ui/react-collapsible'
import { AlertCircle, InboxIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateWorkflowDialog from './_components/CreateWorkflowDialog'
import WorkflowCard from './_components/WorkflowCard'

function page() {
    return (
        <div className="flex flex-1 flex-col h-full">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Workflows</h1>
                    <p className="text-muted-foreground">Manage Your Workflows</p>
                </div>
                <CreateWorkflowDialog />
            </div>
            <div className="h-full py-6">
                <Suspense fallback={<UserWorkflowsSkeleton />}>
                    <UserWorkflows />
                </Suspense>
            </div>
        </div>
    )
}

function UserWorkflowsSkeleton() {
    return <div className="space-y-2">
        {
            [1, 2, 3, 4].map((item) => (<Skeleton key={item} className="h-32 w-full" />)
            )}
    </div>
}

async function UserWorkflows() {

    const workflows = await GetWorkflowsForUser();
    if (!workflows) {
        return (
            <Alert variant={"destructive"}>
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Something went wrong. Please try again later
                </AlertDescription>
            </Alert>
        )
    }

    if (workflows.length === 0) {
        return (
        <div className="flex flex-col items-center gap-4 h-full justify-center">
            <div className="rounded-full bg-accent flex w-20 h-20 items-center justify-center">
                <InboxIcon size={40} className="stroke-primary" />
            </div>
            <div className="flex flex-col gap-1 text-center">
                <p className="font-bold">
                    You've not created any workflow yet...
                </p>
                <div className="text-sm text-muted-foreground">
                    Create your very first workflow
                </div>
            </div>
            <CreateWorkflowDialog triggerText="Create Your very first Workflow!" />
        </div>
        )
    } 

    return <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
    </div>
}
export default page