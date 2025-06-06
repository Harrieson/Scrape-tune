import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";
import NodeParamField from "./NodeParamField";

export function NodeInputs({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col divide-y gap-2">
            {children}
        </div>
    )
}

export function NodeInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {
    return (
        <div className="flex justify-start relative p-3 bg-secondary w-full">
            {/* <pre>
                {JSON.stringify(input, null, 4)}
            </pre> */}
            <NodeParamField param={input} nodeId={nodeId}/>
            {
                !input.hidehandle && (
                    <Handle id={input.name} type="target" position={Position.Left}
                        className={cn("!bg-muted-foreground !border-2 !border-background !w-4 !h-4 !-left-2")} />
                )
            }
        </div>
    )
}