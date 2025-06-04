"use client"
import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string;
}
function DeleteWorkflowDialog({ open, setOpen, workflowName, workflowId }: Props) {

    const [confirmText, setConfirmtext] = useState("");
    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted succesfully", {id: workflowId});
            setConfirmtext("");
        },
        onError:() => {
            toast.error("Something went horribly wrong", {id: workflowId})
        },
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this workflow you won't be able to restore it.
                        <div className="flex flex-col py-4 gap-3">
                            <p>
                                If you're sure, enter <b className='text-destructive'>{workflowName}</b> to confirm
                            </p>
                            <Input value={confirmText} onChange={(e) => setConfirmtext(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmtext("")}>Cancel</AlertDialogCancel>
                    <AlertDialogAction  disabled={confirmText !== workflowName || deleteMutation.isPending} 
                    onClick={(e) => {
                        e.stopPropagation();
                        toast.loading("Deleting workflow...", {id: workflowId});
                        deleteMutation.mutate(workflowId)
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog