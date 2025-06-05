"use client"

import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useEffect } from 'react';
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import NodeComponent from './nodes/NodeComponent';

function FlowEditor({ workflow }: { workflow: Workflow }) {
    const nodeTypes = {
        FlowScrapeNode: NodeComponent
    }

    const snapGrid: [number, number] = [30, 30];
    const fitViewOptions = { padding: 0.2 };
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { setViewport } = useReactFlow();

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            if (!flow) return;

            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            if (!flow.viewport) return;

            const { x = 0, y = 0, zoom = -1 } = flow.viewport;
        } catch (error) {

        }
    }, [workflow.definition, setEdges, setNodes, setViewport])
    return (
        <main className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                snapToGrid={true}
                snapGrid={snapGrid}
                fitViewOptions={fitViewOptions}
                // fitView
            >
                <Controls position="top-left" />
                <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor