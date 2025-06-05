"use client"

import { UpdateWorkflow } from '@/actions/workflows/updateWorkflow';
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

export default function SaveBtn({ workflowId }: { workflowId: string }) {
    const { toObject } = useReactFlow();

    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () => {
            toast.success("Flow saved successfully", { id: "save-workflow" });
        },
        onError: () => {
            toast.error("Something went horribly wrong", { id: "save workflow" });
        },
    });
    return (
        <Button variant={"outline"} className="flex items-center gap-2"
            onClick={() => {
                const workflowDefinition = JSON.stringify(toObject());
                toast.loading("Saving your workflow...", {id: "save-workflow"});
                saveMutation.mutate({
                    id: workflowId,
                    definition: workflowDefinition,
                });
            }}>
            <CheckIcon size={1} className="stroke-green-600" />
            Save
        </Button>
    )
}
