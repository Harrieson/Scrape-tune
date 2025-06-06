
"use client"
import { TaskParam, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/appNode'

function NodeParamField({ param, nodeId }: { param: TaskParam, nodeId: string }) {


    const { updateNodeData, getNode } = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name];


    const updateNodeParamvalue = useCallback((newvalue: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [param.name]: newvalue
            },
        });
    }, [nodeId, updateNodeData, param.name, node?.data.inputs])
    switch (param.type) {

        case TaskParamType.STRING:
            return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamvalue} />
        default:
            return (
                <div className="w-full">
                    <p className="text-xs text-muted-foreground">Not Implemented</p>
                </div>
            )
    }
}

export default NodeParamField