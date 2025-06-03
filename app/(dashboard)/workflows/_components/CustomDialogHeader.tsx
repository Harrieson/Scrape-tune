"use client"


import { DialogHeader } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { DialogTitle } from '@radix-ui/react-dialog';
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface Props {
    title?: string;
    subTitle?: string;
    icon?: LucideIcon;

    iconClassname?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}
function CustomDialogHeader(props: Props) {
    return (
        <DialogHeader className="p-6">
            <DialogTitle asChild>
                <div className="flex flex-col items-center gap-2 mb-2">
                    {props.icon && <props.icon size={30} className={cn("stroke-primary", props.iconClassname)} />}
                    {props.title && <p className={cn("text-xl text-primary", props.titleClassName)}>
                        {props.title}
                    </p>}
                    {props.subTitle && <p className={cn("text-sm text-muted-foreground", props.subtitleClassName)}>
                        {props.subTitle}
                    </p>}
                </div>
            </DialogTitle>
        </DialogHeader>
    )
}

export default CustomDialogHeader