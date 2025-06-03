"use client"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import React from 'react'


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
}
function DeleteWorkflowDialog({ open, setOpen, workflowName }: Props) {
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
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog